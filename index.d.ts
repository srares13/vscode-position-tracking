import vscode from 'vscode'

export function getUpdatedRanges(
   ranges: vscode.Range[],
   changes: vscode.TextDocumentContentChangeEvent[],
   options: { outputChannel: vscode.OutputChannel }
): vscode.Range[]
