# verify-16k-page-align GitHub Action

Run the [verify-16k-page-align](https://github.com/hotbrainstech/verify-16k-page-align) CLI in your GitHub Actions workflow to ensure native libraries inside an Android APK/AAB/APEX are 16KB page-aligned. The action fails the job if any required library is not aligned.

## Prerequisites

- This action runs with Node.js 20. On self-hosted runners, ensure your runner image supports Node 20 or newer.

## Usage

Minimal example (checks arm64-v8a by default):

```yaml
jobs:
  verify_alignment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify 16KB page alignment (arm64-v8a)
        uses: hotbrainstech/verify-16k-page-align-github-action@v1
        with:
          file: app/build/outputs/apk/release/app-release.apk
```

Include x86_64 libraries as well (equivalent to passing `x86` to the CLI):

```yaml
jobs:
  verify_alignment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify 16KB page alignment (arm64-v8a and x86_64)
        uses: hotbrainstech/verify-16k-page-align-github-action@v1
        with:
          file: app/build/outputs/apk/release/app-release.apk
          include_x86: 'true'
```

If any required library is not 16KB aligned, the action will exit with a non-zero status and fail your workflow.

## Inputs

- `file` (required)
  Path to the APK, AAB, or APEX file to check.

- `include_x86` (optional, default: `false`)
  Also check x86_64 libraries in addition to the default arm64-v8a.

## How it works

Under the hood, the action runs the upstream CLI via `npx --yes verify-16k-page-align <file> [x86]`.

## Versioning

We recommend pinning to the latest available major version:

```yaml
- uses: hotbrainstech/verify-16k-page-align-github-action@v1
```

## Questions, Issues and Support

If you have any questions or issues with this action, please [open an issue](https://github.com/hotbrainstech/verify-16k-page-align-github-action/issues).
