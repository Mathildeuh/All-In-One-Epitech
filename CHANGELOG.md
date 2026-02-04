# Changelog

All notable changes to the Epitech All-In-One extension will be documented in this file.

## [1.1.0] - 2026-02-04

### Added
- Inline error decoration for coding style violations (error messages appear at end of line)
- Automatic linting on file save for C/C++ files
- Makefile support in the linter (checks Makefile syntax)
- GitHub repository integration

### Changed
- Updated VS Code engine requirement to `^1.109.0`
- Updated all dependencies to latest versions:
  - TypeScript: `^5.9.3`
  - @types/node: `^25.2.0`
  - @types/vscode: `^1.109.0`
  - @typescript-eslint/eslint-plugin: `^8.54.0`
  - @typescript-eslint/parser: `^8.54.0`
- Removed unused variables and optimized code
- Removed debug console logging

### Removed
- Makefile generator feature (kept linting support)
- Optional `lintOnSave` configuration (now always enabled for supported files)

### Fixed
- Linter now properly handles both C and C++ file extensions

## [1.0.0] - 2026-02-04

### Added
- Header generation for multiple file types (C, C++, Python, JavaScript, TypeScript, Java)
- Epiclang linter integration with workspace-wide checking
- Interactive coding style guide webview
- Configurable settings (author, email, epiclang path)
- Support for keybindings on Windows/Linux and macOS
- MIT License

### Features
- **Generate Header**: `Ctrl+Shift+H` - Automatically generate Epitech-compliant file headers
- **Check Coding Style (Current File)**: `Ctrl+Shift+L` - Run linter on active file
- **Check Coding Style (Workspace)**: `Ctrl+Shift+Alt+L` - Run linter on all C/C++ files
- **Show Coding Style Guide**: `Ctrl+Shift+S` - Display comprehensive coding style documentation
