## Description

If you have some location (position, range) in the document of which you want to know what its new location would be according to document changes, this library aims to provide you with that updated location.

### Important: 
It is an experimental library. It requires further testing regarding the ability to calculate the new location according to document changes. 

Here, if you wish, is where you could help and provide situations in which the updated location is not correct. There are debug loggings which can aid you with this, if you enable them. You will see more details about this below.

<br>

## Library's API

The API of this library consists in a single function that you will use.

The function is called `getUpdatedRanges()`.

<br>

## How to use

### Install the library in your project

- `npm install vscode-range-tracking`

<br>

### Example

```javascript
// Import it.
const { getUpdatedRanges } = require('vscode-range-tracking')

// It has to be used within an onDidChangeTextDocument event listener.
vscode.workspace.onDidChangeTextDocument((event) => {

   const updatedRanges = getUpdatedRanges(
		someRanges, // The locations you want the update for, under the form of an array of ranges. It is a required argument.
		event.contentChanges, // Array of document changes. It is a required argument.
		{ 
			onDeletion: 'remove',
			onAddition: 'split',
			outputChannel: extensionOutputChannel
		} // An object with various options. It is not a required argument.
	) // The function returns the updated locations according to document changes under the form of a new array of ranges.
})
```

<br>

### Options object
The options object is not a required argument.

Available settings:

- ```onDeletion```
	- It tells what happens if a document change that consists in deletion intersects with the range you want the update for.
	- **Values:**
		- ```'remove'```
			- Removes the range. In other words, the returned array will not contain that range.
		- ```'shrink'```
			- Shrinks the range.
	- **Default value:** ```'shrink'```

<br>

- ```onAddition```
	- It tells what happens if a document change that consists in addition intersects with the range you want the update for.
	- **Values:**
		- ```'remove'```
			- Removes the range. In other words, the returned array will not contain that range.
		- ```'extend'```
			- Extends the range.
		- ```'split'```
			- Splits the range.
	- **Default value:** ```'extend'```

<br>

- ```debugConsole```
	- It enables or disables logs on the debug console. For each onDidChangeTextDocument event it will log document change ranges, ranges to track, and updated ranges. 
	- **Note:**  The updated ranges are the ones that the library calculated.
	- **Values:**
		- ```true``` | ```false```
	- **Default value:** ```undefined``` which is a falsy value and will have the same effect as ```false```.

<br>

- ```outputChannel```
	- It will have the same effect as ```debugConsole``` option, but the logs will be shown on the output tab of the terminal on the extension host window / end user window. This only if an output channel is provided.
	- **Values:**
		- ```vscode.outputChannel```
	- **Default value:** ```undefined```

<br>
	
### Return value

- The updated ranges are in the same order as the ones from the array sent as argument.

- In the case of having the ```onAddition``` option set to ```'split'```, the new split ranges will be positioned in the array in the order they appear in the document and from the position of the original range that was split. Example: rangesToTrack = [A, B, C], if B was split in two ranges, the returned array will be [updatedA, D, E, updatedC].



<br>

## Signature of getUpdatedRanges()

```javascript
getUpdatedRanges(
   ranges: vscode.Range[],
   changes: vscode.TextDocumentContentChangeEvent[],
   options: {
		onDeletion: 'remove'|'shrink',
		onAddition: 'remove'|'extend'|'split',
		debugConsole: boolean,
		outputChannel: vscode.OutputChannel
	}
): vscode.Range[]
```

<br>

## How to help
