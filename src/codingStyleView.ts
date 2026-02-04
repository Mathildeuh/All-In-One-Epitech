import * as vscode from 'vscode';

export class CodingStyleProvider {
    public static currentPanel: CodingStyleProvider | undefined;
    private readonly panel: vscode.WebviewPanel;
    private disposables: vscode.Disposable[] = [];

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this.panel = panel;
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
        this.panel.webview.html = this.getWebviewContent();
    }

    public static show(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (CodingStyleProvider.currentPanel) {
            CodingStyleProvider.currentPanel.panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'epitechCodingStyle',
            'Epitech Coding Style',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        CodingStyleProvider.currentPanel = new CodingStyleProvider(panel, extensionUri);
    }

    private getWebviewContent(): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Epitech Coding Style</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            line-height: 1.6;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        h1 {
            color: var(--vscode-textLink-foreground);
            border-bottom: 2px solid var(--vscode-textLink-foreground);
            padding-bottom: 10px;
        }
        h2 {
            color: var(--vscode-textPreformat-foreground);
            margin-top: 30px;
        }
        h3 {
            color: var(--vscode-textSeparator-foreground);
            margin-top: 20px;
        }
        .rule {
            background-color: var(--vscode-textBlockQuote-background);
            border-left: 4px solid var(--vscode-textLink-foreground);
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        .rule-title {
            font-weight: bold;
            color: var(--vscode-textLink-foreground);
            margin-bottom: 10px;
        }
        code {
            background-color: var(--vscode-textCodeBlock-background);
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        pre {
            background-color: var(--vscode-textCodeBlock-background);
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .warning {
            color: var(--vscode-editorWarning-foreground);
            font-weight: bold;
        }
        .error {
            color: var(--vscode-editorError-foreground);
            font-weight: bold;
        }
        ul {
            margin-left: 20px;
        }
        li {
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <h1>📋 Epitech Coding Style Guide</h1>
    
    <h2>General Rules</h2>
    
    <div class="rule">
        <div class="rule-title">File Organization</div>
        <ul>
            <li>Every <code>.c</code> file must have a corresponding <code>.h</code> file</li>
            <li>All files must start with the Epitech header</li>
            <li>Include guards are mandatory in header files</li>
            <li>Files should contain only one function or a cohesive group of related functions</li>
        </ul>
    </div>

    <div class="rule">
        <div class="rule-title">Naming Conventions</div>
        <ul>
            <li>Variables and functions: <code>snake_case</code></li>
            <li>Macros and constants: <code>UPPER_SNAKE_CASE</code></li>
            <li>Structures and typedef: <code>snake_case_t</code></li>
            <li>Global variables should be prefixed with <code>g_</code></li>
            <li>Static variables should be prefixed with <code>s_</code></li>
        </ul>
    </div>

    <h2>Formatting Rules</h2>

    <div class="rule">
        <div class="rule-title">Indentation</div>
        <ul>
            <li>Use 4 spaces for indentation (no tabs)</li>
            <li>Braces should be on the same line as the statement</li>
            <li>Example:</li>
        </ul>
        <pre><code>if (condition) {
    // code here
}</code></pre>
    </div>

    <div class="rule">
        <div class="rule-title">Line Length</div>
        <ul>
            <li><span class="error">Maximum 80 characters per line</span></li>
            <li>Break long lines appropriately</li>
            <li>Long function calls should be split across multiple lines</li>
        </ul>
    </div>

    <div class="rule">
        <div class="rule-title">Functions</div>
        <ul>
            <li><span class="error">Maximum 25 lines per function</span></li>
            <li>Maximum 4 parameters per function</li>
            <li>Function prototypes must be in header files</li>
            <li>Functions should do one thing and do it well</li>
        </ul>
    </div>

    <h2>Code Quality Rules</h2>

    <div class="rule">
        <div class="rule-title">Forbidden Constructs</div>
        <ul>
            <li class="error">No <code>goto</code></li>
            <li class="error">No multiple assignments on the same line</li>
            <li class="error">No nested ternary operators</li>
            <li class="error">No assignments in conditions</li>
            <li class="error">No macro functions</li>
        </ul>
    </div>

    <div class="rule">
        <div class="rule-title">Control Structures</div>
        <ul>
            <li>Maximum 3 levels of indentation</li>
            <li>No more than 2 nested control structures</li>
            <li>Always use braces, even for single-line blocks</li>
        </ul>
    </div>

    <div class="rule">
        <div class="rule-title">Comments</div>
        <ul>
            <li>Comment complex algorithms and non-obvious code</li>
            <li>No commented-out code in final submission</li>
            <li>Use <code>// TODO:</code> for temporary notes during development</li>
        </ul>
    </div>

    <h2>Header File Structure</h2>

    <div class="rule">
        <div class="rule-title">Include Guards</div>
        <pre><code>#ifndef MY_HEADER_H_
#define MY_HEADER_H_

// Header content here

#endif /* !MY_HEADER_H_ */</code></pre>
    </div>

    <div class="rule">
        <div class="rule-title">Header Includes Order</div>
        <ol>
            <li>Project headers</li>
            <li>Library headers</li>
            <li>System headers</li>
        </ol>
    </div>

    <h2>Common Violations</h2>

    <div class="rule">
        <div class="rule-title"><span class="warning">⚠️ Most Common Errors</span></div>
        <ul>
            <li>Lines exceeding 80 characters</li>
            <li>Functions exceeding 25 lines</li>
            <li>Missing or incorrect header</li>
            <li>Trailing whitespace</li>
            <li>Missing include guards</li>
            <li>Incorrect indentation</li>
            <li>Too many parameters (>4)</li>
        </ul>
    </div>

    <h2>Checking Your Code</h2>

    <div class="rule">
        <div class="rule-title">Using the Linter</div>
        <ul>
            <li>Use <code>Ctrl+L</code> to check the current file</li>
            <li>Use <code>Ctrl+Shift+L</code> to check the entire workspace</li>
            <li>Or run: <code>epiclang -Wno-everything -fsyntax-only *</code></li>
        </ul>
    </div>

    <h2>Additional Resources</h2>

    <div class="rule">
        <ul>
            <li><a href="https://intra.epitech.eu/file/Public/technical-documentations/epitech_c_coding_style.pdf">Official Epitech C Coding Style (PDF)</a></li>
            <li>Ask your teaching assistants for clarification on specific rules</li>
            <li>Review coding style feedback from previous projects</li>
        </ul>
    </div>

    <p style="margin-top: 40px; text-align: center; color: var(--vscode-descriptionForeground);">
        <em>Remember: Clean code is not just about following rules—it's about writing code that others can understand and maintain.</em>
    </p>
</body>
</html>`;
    }

    public dispose() {
        CodingStyleProvider.currentPanel = undefined;

        this.panel.dispose();

        while (this.disposables.length) {
            const disposable = this.disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}
