#!/usr/bin/env bash
set -euo pipefail
VERSION="${1:-1.0.0}"
ARCHIVE="proctorx-suite-v${VERSION}.zip"
ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
TEMP_DIR=$(mktemp -d)

cleanup() {
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

cp -R "$ROOT_DIR/frontend" "$TEMP_DIR/frontend"
cp -R "$ROOT_DIR/backend" "$TEMP_DIR/backend"
cp -R "$ROOT_DIR/docs" "$TEMP_DIR/docs"
cp -R "$ROOT_DIR/database" "$TEMP_DIR/database"
cp -R "$ROOT_DIR/docker" "$TEMP_DIR/docker"
cp -R "$ROOT_DIR/license" "$TEMP_DIR/license"
cp "$ROOT_DIR/CHANGELOG.md" "$TEMP_DIR/changelog.md"
cp "$ROOT_DIR/README.md" "$TEMP_DIR/readme.md"
cp "$ROOT_DIR/envato-help-file.html" "$TEMP_DIR/envato-help-file.html"

pushd "$TEMP_DIR" >/dev/null
zip -r "$ARCHIVE" frontend backend docs database docker license changelog.md readme.md envato-help-file.html
popd >/dev/null

mv "$TEMP_DIR/$ARCHIVE" "$ROOT_DIR/$ARCHIVE"
echo "Package created at $ROOT_DIR/$ARCHIVE"
