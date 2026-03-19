# Changelog

All notable changes to the Epitech All-In-One extension will be documented in this file.

## [1.2.0] - 2026-03-19

### Added
- Automatic include path detection for `epiclang`. The linter now finds and includes all project directories containing header files.
- New configuration `epitech.autoInclude` (default `true`) to toggle automatic header detection.
- New configuration `epitech.includePaths` for manual addition of include directories (supports `${workspaceFolder}`).
- New configuration `epitech.showOutput` (default `false`) to control whether the Output channel automatically takes focus when the linter runs.
- New configuration `epitech.enableHeaderShortcut` (default `true`) to toggle the default header generation shortcut (`CTRL+SHIFT+H`).
- Documentation for customizing keybindings via VS Code's native Keyboard Shortcuts editor.

### Changed
- The Output channel no longer takes focus by default when running the linter, preventing interruption of the terminal view.

### Fixed
- Fatal error when header files were not in the same directory as the source file being linted.

## [1.1.0] - 2026-02-04

### Added
- Automatic linting on file save for C/C++ files
- Makefile support in the linter (checks Makefile syntax)

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
