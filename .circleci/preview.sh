#!/usr/bin/env bash

source ./artifact-variables.sh

PREVIEWS="$(artifactLink 'index.html' 'site')"

# Submit comment
submitPreviewComment "<h3>${COMMIT_MESSAGE}</h3>\n\nPreview: <strong>${PREVIEWS}</strong>"