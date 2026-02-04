# Epitech All-In-One Extension 🎓

A comprehensive Visual Studio Code extension designed specifically for Epitech students. This extension helps you maintain proper coding style, generate headers, and check your code against Epitech standards using epiclang.

## ✨ Features

### 🎯 Header Generation
Automatically generate Epitech-compliant headers for your source files with support for:
- C/C++ files (`.c`, `.h`, `.cpp`, `.hpp`)
- Python files (`.py`)
- JavaScript/TypeScript files (`.js`, `.ts`)
- Java files (`.java`)

**Usage:** Press `Ctrl+Shift+H` (or `Cmd+Shift+H` on Mac)

### 🔍 Coding Style Checker (Linter)
Integrated epiclang linter that checks your code against Epitech coding standards:
- Run on current file: `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
- Run on entire workspace: `Ctrl+Shift+Alt+L` (or `Cmd+Shift+Alt+L` on Mac)
- Uses `epiclang -Wno-everything -fsyntax-only` for syntax checking
- Real-time diagnostics in the Problems panel
- Detailed output in the Output channel

### 📚 Coding Style Guide
Interactive webview displaying Epitech coding style rules:
- Complete reference guide for all coding standards
- Examples of correct and incorrect code
- Common violations and how to fix them
- Quick access via `Ctrl+Shift+S` (or `Cmd+Shift+S` on Mac)

### ⚙️ Configurable Settings
Customize the extension to your needs:
- Set your author name and email for headers
- Configure epiclang path

## 📦 Installation

### Prerequisites
- Visual Studio Code v1.60.0 or higher
- Node.js and npm
- epiclang installed and available in your PATH

### From Source
1. Clone this repository:
   ```bash
   git clone https://github.com/Mathildeuh/All-In-One-Epitech.git
   cd All-In-One-Epitech
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the extension:
   ```bash
   npm run compile
   ```

4. Press `F5` in VS Code to launch the extension in debug mode

### Building VSIX Package
To create an installable `.vsix` file:
```bash
npm install -g vsce
vsce package
```

Then install with:
```bash
code --install-extension epitech-all-in-one-1.0.0.vsix
```

## 🚀 Usage

### Commands
Access commands via Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- **Epitech: Generate Header** - Generate Epitech header for current file
- **Epitech: Check Coding Style (Current File)** - Run linter on active file
- **Epitech: Check Coding Style (Workspace)** - Run linter on all C/C++ files
- **Epitech: Show Coding Style Guide** - Open coding style reference

### Keyboard Shortcuts
| Command | Windows/Linux | Mac |
|---------|--------------|-----|
| Generate Header | `Ctrl+Shift+H` | `Cmd+Shift+H` |
| Check Current File | `Ctrl+Shift+L` | `Cmd+Shift+L` |
| Check Workspace | `Ctrl+Shift+Alt+L` | `Cmd+Shift+Alt+L` |
| Show Style Guide | `Ctrl+Shift+S` | `Cmd+Shift+S` |

### Configuration
Go to Settings (`Ctrl+,`) and search for "Epitech":

```json
{
  "epitech.author": "Your Name",
  "epitech.email": "your.email@epitech.eu",
   "epitech.epiclangPath": "epiclang"
}
```

## 🐳 Docker Support

The project includes a Dockerfile for containerized development:

```bash
docker build -t epitech-extension .
docker run -it epitech-extension
```

## 🔧 Development

### Project Structure
```
epitech-all-in-one/
├── src/
│   ├── extension.ts           # Main extension entry point
│   ├── headerGenerator.ts     # Header generation logic
│   ├── linter.ts              # Epiclang linter integration
│   └── codingStyleView.ts     # Webview for style guide
├── package.json               # Extension manifest
├── tsconfig.json              # TypeScript configuration
├── Dockerfile                 # Docker configuration
└── README.md                  # This file
```

### Building
```bash
npm run compile    # Compile TypeScript
npm run watch      # Watch mode for development
npm run lint       # Run ESLint
```

## 📝 Coding Style Rules

The extension enforces Epitech coding standards including:
- Maximum 80 characters per line
- Maximum 25 lines per function
- Maximum 4 parameters per function
- Proper naming conventions (snake_case, UPPER_SNAKE_CASE)
- Required Epitech headers
- Include guards in header files
- And many more...

View the complete guide using the "Show Coding Style Guide" command.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- epiclang must be installed separately and available in PATH
- Some error parsing may need refinement for specific epiclang output formats

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Epitech for the coding standards
- VSCode Extension API documentation
- All contributors to this project

## 📧 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Contact the maintainers
- Check the Epitech intranet for coding style documentation

---

Made with ❤️ for Epitech students