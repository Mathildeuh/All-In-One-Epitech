import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface LintResult {
    line: number;
    column: number;
    severity: vscode.DiagnosticSeverity;
    message: string;
    code?: string;
}

export class Linter {
    private diagnosticCollection: vscode.DiagnosticCollection;
    private outputChannel: vscode.OutputChannel;
    private inlineDecoration: vscode.TextEditorDecorationType;

    constructor() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('epitech');
        this.outputChannel = vscode.window.createOutputChannel('Epitech Linter');
        this.inlineDecoration = vscode.window.createTextEditorDecorationType({
            after: {
                margin: '0 0 0 1em',
                color: new vscode.ThemeColor('editorError.foreground')
            }
        });
    }

    public async runLinter(document: vscode.TextDocument): Promise<void> {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        const fileName = path.basename(document.fileName);
        const fileExtension = path.extname(document.fileName);
        const supportedExtensions = ['.c', '.h', '.cpp', '.hpp'];
        const isMakefile = fileName === 'Makefile' || fileName.startsWith('Makefile.');
        
        if (!supportedExtensions.includes(fileExtension) && !isMakefile) {
            vscode.window.showWarningMessage('Linter is only supported for C/C++ files and Makefiles');
            return;
        }

        await this.runEpiclang(document, workspaceFolder);
    }

    private async runEpiclang(document: vscode.TextDocument, workspaceFolder: vscode.WorkspaceFolder): Promise<void> {
        const config = vscode.workspace.getConfiguration('epitech');
        const epiclangPath = config.get<string>('epiclangPath') || 'epiclang';
        const workspacePath = workspaceFolder.uri.fsPath;

        this.outputChannel.clear();
        this.outputChannel.show(true);
        this.outputChannel.appendLine(`Running epiclang on ${document.fileName}...`);

        try {
            const command = `${epiclangPath} -Wno-everything -fsyntax-only "${document.fileName}"`;
            this.outputChannel.appendLine(`Command: ${command}`);

            const { stdout, stderr } = await execAsync(command, {
                cwd: workspacePath,
                maxBuffer: 1024 * 1024 * 10
            });

            if (stdout) {
                this.outputChannel.appendLine(stdout);
            }

            if (stderr) {
                this.outputChannel.appendLine(stderr);
                this.parseLinterOutput(document, stderr);
            } else {
                this.diagnosticCollection.set(document.uri, []);
                this.clearInlineDecorations(document);
                vscode.window.showInformationMessage('No coding style issues found');
            }

        } catch (error: any) {
            this.outputChannel.appendLine(`Error: ${error.message}`);
            
            if (error.stdout) {
                this.outputChannel.appendLine(error.stdout);
            }
            
            if (error.stderr) {
                this.outputChannel.appendLine(error.stderr);
                this.parseLinterOutput(document, error.stderr);
            }
            
            vscode.window.showErrorMessage('Failed to run epiclang. Make sure it is installed and in your PATH.');
        }
    }

    private parseLinterOutput(document: vscode.TextDocument, output: string): void {
        const diagnostics: vscode.Diagnostic[] = [];
        const lines = output.split('\n');

        for (const line of lines) {
            const match = line.match(/^(.+?):(\d+):(\d+):\s+(error|warning|note):\s+(.+)$/);
            
            if (match) {
                const [, , lineNum, colNum, severityStr, message] = match;
                const lineNumber = parseInt(lineNum, 10) - 1;
                const columnNumber = parseInt(colNum, 10) - 1;

                let severity = vscode.DiagnosticSeverity.Error;
                if (severityStr === 'warning') {
                    severity = vscode.DiagnosticSeverity.Warning;
                } else if (severityStr === 'note') {
                    severity = vscode.DiagnosticSeverity.Information;
                }

                const range = new vscode.Range(
                    new vscode.Position(lineNumber, columnNumber),
                    new vscode.Position(lineNumber, columnNumber + 1)
                );

                const diagnostic = new vscode.Diagnostic(range, message, severity);
                diagnostic.source = 'epiclang';
                diagnostics.push(diagnostic);
            }
        }

        this.diagnosticCollection.set(document.uri, diagnostics);
        this.applyInlineDecorations(document, diagnostics);

        if (diagnostics.length > 0) {
            vscode.window.showWarningMessage(`Found ${diagnostics.length} coding style issue(s)`);
        }
    }

    private applyInlineDecorations(document: vscode.TextDocument, diagnostics: vscode.Diagnostic[]): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.uri.toString() !== document.uri.toString()) {
            return;
        }

        const decorationOptions: vscode.DecorationOptions[] = diagnostics.map((diag) => {
            const line = diag.range.start.line;
            const lineText = document.lineAt(line).text;
            const endPos = new vscode.Position(line, lineText.length);

            return {
                range: new vscode.Range(endPos, endPos),
                renderOptions: {
                    after: {
                        contentText: `⟶ ${diag.message}`
                    }
                }
            };
        });

        editor.setDecorations(this.inlineDecoration, decorationOptions);
    }

    private clearInlineDecorations(document: vscode.TextDocument): void {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.uri.toString() !== document.uri.toString()) {
            return;
        }

        editor.setDecorations(this.inlineDecoration, []);
    }

    public async runLinterOnWorkspace(): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        const config = vscode.workspace.getConfiguration('epitech');
        const epiclangPath = config.get<string>('epiclangPath') || 'epiclang';

        for (const folder of workspaceFolders) {
            this.outputChannel.clear();
            this.outputChannel.show(true);
            this.outputChannel.appendLine(`Running epiclang on workspace: ${folder.uri.fsPath}`);

            try {
                const command = `${epiclangPath} -Wno-everything -fsyntax-only *.c *.h *.cpp *.hpp`;
                this.outputChannel.appendLine(`Command: ${command}`);

                const { stdout, stderr } = await execAsync(command, {
                    cwd: folder.uri.fsPath,
                    maxBuffer: 1024 * 1024 * 10
                });

                if (stdout) {
                    this.outputChannel.appendLine(stdout);
                }

                if (stderr) {
                    this.outputChannel.appendLine(stderr);
                } else {
                    vscode.window.showInformationMessage('No coding style issues found in workspace');
                }

            } catch (error: any) {
                this.outputChannel.appendLine(`Error: ${error.message}`);
                
                if (error.stdout) {
                    this.outputChannel.appendLine(error.stdout);
                }
                
                if (error.stderr) {
                    this.outputChannel.appendLine(error.stderr);
                }
            }
        }
    }

    public dispose(): void {
        this.diagnosticCollection.dispose();
        this.outputChannel.dispose();
        this.inlineDecoration.dispose();
    }
}
