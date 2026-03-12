#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONTRACTS_REPO_URL="${INVEST_CONTRACTS_REPO_URL:-https://opensource.tbank.ru/invest/invest-contracts.git}"
CONTRACTS_REF="${INVEST_CONTRACTS_REF:-master}"
CONTRACTS_LOCAL_DIR="${INVEST_CONTRACTS_LOCAL_DIR:-}"
DEBUG_MODE="${INVEST_PROTO_DEBUG:-0}"
HEARTBEAT_SEC="${INVEST_PROTO_HEARTBEAT_SEC:-15}"
SKIP_NPM_CI="${INVEST_PROTO_SKIP_NPM_CI:-0}"
NPM_CI_TIMEOUT_SEC="${INVEST_PROTO_NPM_CI_TIMEOUT_SEC:-600}"
TMP_DIR="$(mktemp -d)"
REPO_DIR="$TMP_DIR/invest-contracts"
CONTRACTS_DIR=""
ERRORS_FILE=""
CONTRACTS_SOURCE_TYPE="remote"
CONTRACTS_COMMIT=""
MANIFEST_FILE="./src/generated/contracts-manifest.json"
CURRENT_STEP="initialization"
TOTAL_START="$SECONDS"

log() {
  printf '[generate:proto][%s] %s\n' "$(date '+%H:%M:%S')" "$*"
}

on_error() {
  local exit_code=$?
  log "FAILED on step: $CURRENT_STEP (exit code: $exit_code)"
  exit "$exit_code"
}

run_with_timeout_if_available() {
  if command -v timeout >/dev/null 2>&1; then
    timeout --foreground "${NPM_CI_TIMEOUT_SEC}s" "$@"
  else
    "$@"
  fi
}

run_npm_ci() {
  local ci_args=()
  if [[ "$DEBUG_MODE" == "1" ]]; then
    ci_args+=(--verbose)
  fi

  run_with_timeout_if_available npm ci "${ci_args[@]}"
}

run_step() {
  local step="$1"
  shift
  CURRENT_STEP="$step"
  local started_at="$SECONDS"

  log "START: $step"
  if [[ "$DEBUG_MODE" == "1" ]]; then
    local next_heartbeat=$((started_at + HEARTBEAT_SEC))
    "$@" &
    local cmd_pid="$!"
    while kill -0 "$cmd_pid" 2>/dev/null; do
      sleep 1
      if kill -0 "$cmd_pid" 2>/dev/null && ((SECONDS >= next_heartbeat)); then
        local running_for=$((SECONDS - started_at))
        log "RUNNING: $step (${running_for}s)"
        next_heartbeat=$((SECONDS + HEARTBEAT_SEC))
      fi
    done
    wait "$cmd_pid"
  else
    "$@"
  fi

  local elapsed=$((SECONDS - started_at))
  log "DONE: $step (${elapsed}s)"
}

cleanup() {
  rm -rf "$TMP_DIR"
}

write_manifest() {
  cat > "$MANIFEST_FILE" <<EOF
{
  "generatedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "sourceType": "${CONTRACTS_SOURCE_TYPE}",
  "sourceRepo": "${CONTRACTS_REPO_URL}",
  "sourceRef": "${CONTRACTS_REF}",
  "sourceCommit": "${CONTRACTS_COMMIT}",
  "localSourceDir": "${CONTRACTS_LOCAL_DIR}",
  "contractsDir": "${CONTRACTS_DIR}",
  "errorsFile": "${ERRORS_FILE}",
  "protoFilesCount": ${#proto_files[@]}
}
EOF
}

trap cleanup EXIT
trap on_error ERR

log "Generating types from proto file started"
if [[ "$DEBUG_MODE" == "1" ]]; then
  if [[ ! "$HEARTBEAT_SEC" =~ ^[0-9]+$ || "$HEARTBEAT_SEC" -lt 1 ]]; then
    echo "INVEST_PROTO_HEARTBEAT_SEC must be a positive integer, got: $HEARTBEAT_SEC" >&2
    exit 1
  fi
  log "Debug mode is enabled (heartbeat: ${HEARTBEAT_SEC}s)"
fi

if [[ ! "$NPM_CI_TIMEOUT_SEC" =~ ^[0-9]+$ || "$NPM_CI_TIMEOUT_SEC" -lt 1 ]]; then
  echo "INVEST_PROTO_NPM_CI_TIMEOUT_SEC must be a positive integer, got: $NPM_CI_TIMEOUT_SEC" >&2
  exit 1
fi

if [[ "$SKIP_NPM_CI" != "0" && "$SKIP_NPM_CI" != "1" ]]; then
  echo "INVEST_PROTO_SKIP_NPM_CI must be 0 or 1, got: $SKIP_NPM_CI" >&2
  exit 1
fi

cd "$SCRIPT_DIR"

if [[ -n "${INVEST_CONTRACTS_DIR:-}" || -n "${INVEST_ERRORS_FILE:-}" ]]; then
  echo "INVEST_CONTRACTS_DIR and INVEST_ERRORS_FILE are removed." >&2
  echo "Use INVEST_CONTRACTS_REPO_URL and INVEST_CONTRACTS_REF instead." >&2
  exit 1
fi

if [[ -n "$CONTRACTS_LOCAL_DIR" ]]; then
  CONTRACTS_SOURCE_TYPE="local"
  CONTRACTS_DIR="$CONTRACTS_LOCAL_DIR/src/docs/contracts"
  ERRORS_FILE="$CONTRACTS_LOCAL_DIR/src/docs/errors/api_errors.json"

  if [[ ! -d "$CONTRACTS_DIR" ]]; then
    echo "Local contracts directory not found: $CONTRACTS_DIR" >&2
    echo "Set INVEST_CONTRACTS_LOCAL_DIR to invest-contracts repository root." >&2
    exit 1
  fi

  if [[ ! -f "$ERRORS_FILE" ]]; then
    echo "Local errors file not found: $ERRORS_FILE" >&2
    exit 1
  fi

  if command -v git >/dev/null 2>&1 && git -C "$CONTRACTS_LOCAL_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    CONTRACTS_COMMIT="$(git -C "$CONTRACTS_LOCAL_DIR" rev-parse HEAD)"
  fi

  log "Using local contracts source: $CONTRACTS_LOCAL_DIR"
else
  CONTRACTS_DIR="$REPO_DIR/src/docs/contracts"
  ERRORS_FILE="$REPO_DIR/src/docs/errors/api_errors.json"

  if ! command -v git >/dev/null 2>&1; then
    echo "git is required to fetch contracts from $CONTRACTS_REPO_URL" >&2
    exit 1
  fi

  run_step \
    "clone contracts from ${CONTRACTS_REPO_URL} (ref: ${CONTRACTS_REF})" \
    git clone --depth 1 --branch "$CONTRACTS_REF" "$CONTRACTS_REPO_URL" "$REPO_DIR"

  CONTRACTS_COMMIT="$(git -C "$REPO_DIR" rev-parse HEAD)"
fi

if [[ ! -d "$CONTRACTS_DIR" ]]; then
  echo "Contracts directory not found: $CONTRACTS_DIR" >&2
  exit 1
fi

if [[ ! -f "$ERRORS_FILE" ]]; then
  echo "Errors file not found: $ERRORS_FILE" >&2
  exit 1
fi

shopt -s nullglob
proto_files=("$CONTRACTS_DIR"/*.proto)
shopt -u nullglob

if [[ ${#proto_files[@]} -eq 0 ]]; then
  echo "No .proto files found in: $CONTRACTS_DIR" >&2
  exit 1
fi

log "Found ${#proto_files[@]} proto files"

if [[ "$SKIP_NPM_CI" == "1" ]]; then
  if [[ ! -x ./node_modules/.bin/protoc || ! -x ./node_modules/.bin/protoc-gen-ts_proto ]]; then
    echo "Cannot skip npm ci: required binaries are missing in node_modules/.bin" >&2
    echo "Run without INVEST_PROTO_SKIP_NPM_CI=1 once to install dependencies." >&2
    exit 1
  fi
  log "Skipping npm ci (INVEST_PROTO_SKIP_NPM_CI=1)"
else
  run_step "npm ci (timeout ${NPM_CI_TIMEOUT_SEC}s)" run_npm_ci
fi

run_step "cleanup dist and generated output" rm -rf ./dist ./src/generated/
run_step "create generated directory" mkdir -p ./src/generated/
run_step "set permissions on generated directory" chmod 755 ./src/generated
run_step "write contracts source manifest" write_manifest

run_step "copy api_errors.json" cp "$ERRORS_FILE" ./src/errors/api_errors.json

run_step \
  "generate types with protoc + ts-proto" \
  ./node_modules/.bin/protoc \
    --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_out=./src/generated \
    --ts_proto_opt=outputServices=generic-definitions,useExactTypes=false \
    -I "$CONTRACTS_DIR" \
    "${proto_files[@]}" \
    --experimental_allow_proto3_optional

if [[ "$DEBUG_MODE" == "1" ]]; then
  run_step "npm run build (verbose)" npm run build --loglevel verbose
else
  run_step "npm run build" npm run build
fi

total_elapsed=$((SECONDS - TOTAL_START))
log "Successfully generated types from $CONTRACTS_REPO_URL (ref: $CONTRACTS_REF) in ${total_elapsed}s"
