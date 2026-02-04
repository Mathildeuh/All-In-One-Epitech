import * as vscode from 'vscode';
import * as path from 'path';
import { generateHeader } from './headerGenerator';
import { Linter } from './linter';
import { CodingStyleProvider } from './codingStyleView';

let linter: Linter;

export function activate(context: vscode.ExtensionContext) {
    linter = new Linter();

    const generateHeaderCommand = vscode.commands.registerCommand(
        'epitech.generateHeader',
        () => {
            generateHeader();
        }
    );

    const runLinterCommand = vscode.commands.registerCommand(
        'epitech.runLinter',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                await linter.runLinter(editor.document);
            } else {
                vscode.window.showErrorMessage('No active editor found');
            }
        }
    );

    const runLinterWorkspaceCommand = vscode.commands.registerCommand(
        'epitech.runLinterWorkspace',
        async () => {
            await linter.runLinterOnWorkspace();
        }
    );

    const showCodingStyleCommand = vscode.commands.registerCommand(
        'epitech.showCodingStyle',
        () => {
            CodingStyleProvider.show(context.extensionUri);
        }
    );

    const onSaveHandler = vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
        const fileName = path.basename(document.fileName);
        const isMakefile = fileName === 'Makefile' || fileName.startsWith('Makefile.');
        
        if (document.languageId === 'c' || document.languageId === 'cpp' || isMakefile) {
            await linter.runLinter(document);
        }
    });

    context.subscriptions.push(
        generateHeaderCommand,
        runLinterCommand,
        runLinterWorkspaceCommand,
        showCodingStyleCommand,
        onSaveHandler,
        linter
    );

    vscode.window.showInformationMessage('Epitech All-In-One extension loaded successfully!');
}

export function deactivate() {
    if (linter) {
        linter.dispose();
    }
}