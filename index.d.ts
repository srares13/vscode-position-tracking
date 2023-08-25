import vscode from 'vscode'

export function getUpdatedRanges(
   ranges: vscode.Range[],
   changes: vscode.TextDocumentContentChangeEvent[],
   options?: {
      onDeletion?: 'remove' | 'shrink'
      onAddition?: 'remove' | 'extend' | 'split'
      debugConsole?: boolean
      outputChannel?: vscode.OutputChannel
   }
): vscode.Range[]
