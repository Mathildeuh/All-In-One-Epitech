import * as vscode from 'vscode';
import * as path from 'path';

export function generateHeader(): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const document = editor.document;
    const fileName = path.basename(document.fileName);
    const fileExtension = path.extname(fileName);

    const supportedExtensions = ['.c', '.h', '.cpp', '.hpp', '.py', '.js', '.ts', '.java'];
    if (!supportedExtensions.includes(fileExtension)) {
        vscode.window.showWarningMessage('Header generation is not supported for this file type');
        return;
    }

    const now = new Date();

    let header = '';
    if (['.c', '.h', '.cpp', '.hpp', '.java'].includes(fileExtension)) {
        header = `/*
** EPITECH PROJECT, ${now.getFullYear()}
** ${fileName}
** File description:
** ${fileName}
*/

`;
    } else if (fileExtension === '.py') {
        header = `##
## EPITECH PROJECT, ${now.getFullYear()}
## ${fileName}
## File description:
## ${fileName}
##

`;
    } else if (['.js', '.ts'].includes(fileExtension)) {
        header = `/*
** EPITECH PROJECT, ${now.getFullYear()}
** ${fileName}
** File description:
** ${fileName}
*/

`;
    }

    editor.edit((editBuilder: vscode.TextEditorEdit) => {
        editBuilder.insert(new vscode.Position(0, 0), header);
    });

    vscode.window.showInformationMessage('Header generated successfully');
}
