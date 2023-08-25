## Description

If you have some location in the document of which you want to know what would be its new location according to document changes, this library aims to provide you with that updated location.

### Important: 
It is an experimental library. It requires further testing regarding its ability to effectively update the wanted location.

Here, if you wish, is where you could help and provide situations in which the updated location is not correct. There are debug loggings which can aid you with this, if you enable them. You will see more details about this below.

<br>

## Library's API

The API of this library consists in a single function that you will use.

This function is called `getUpdatedRanges()`.

<br>

## How to use

### Install the library in your project

- `npm install vscode-range-tracking`

<br>

### Example

```javascript
// Import it.
const { getUpdatedRanges } = require('vscode-range-tracking')

// To update your document locations according to each
// document change that occurs,
// the getUpdatedRanges() function has to be used 
// within an onDidChangeTextDocument event listener.
vscode.workspace.onDidChangeTextDocument((event) => {

   const updatedRanges = getUpdatedRanges(
		// The locations you want to update,
		// under the form of an array of ranges.
		// It is a required argument.
		someRanges,
		// Array of document changes.
		// It is a required argument.
		event.contentChanges,
		// An object with various options.
		// It is not a required argument.
		{ 
			onDeletion: 'remove',
			onAddition: 'split',
			outputChannel: extensionOutputChannel
		}
	) 
	// The function returns the updated locations
	// according to document changes,
	// under the form of a new array of ranges.
})
```

<br>

### Options object
The options object is not a required argument.

Available settings:

- ```onDeletion```
	- It tells what happens if a document change that consists in deletion intersects with the range you want to update.
	- **Values:**
		- ```'remove'```
			- Removes the range. In other words, the returned array will not contain that range or its update.
		- ```'shrink'```
			- Shrinks the range.
	- **Default value:** ```'shrink'```

<br>

- ```onAddition```
	- It tells what happens if a document change that consists in addition intersects with the range you want to update.
	- **Values:**
		- ```'remove'```
			- Removes the range. In other words, the returned array will not contain that range or its update.
		- ```'extend'```
			- Extends the range.
		- ```'split'```
			- Splits the range.
	- **Default value:** ```'extend'```

<br>

- ```debugConsole```
	- It enables or disables logs on the debug console. For each onDidChangeTextDocument event it will log document change ranges, to update ranges, and updated ranges. 
	- **Note:**  The updated ranges are the ones that the library calculated.
	- **Values:**
		- ```true``` | ```false```
	- **Default value:** ```undefined``` which is a falsy value. In the library's code it will have the same effect as ```false```.

<br>

- ```outputChannel```
	- It has the same effect as ```debugConsole``` option, but the logs will be shown on the terminal's output tab in the extension host window / end user window. This only if an output channel is provided.
	- **Values:**
		- ```vscode.outputChannel```
	- **Default value:** ```undefined```

<br>
	
### Return value

- The updated ranges are in the same order as the ones that you want to update.

- In the case of having the ```onAddition``` option set to ```'split'```, the new split ranges will be positioned in the returned array in the order they appear in document and from the position of the original range that was split. Example: toUpdateRanges = [A, B, C], if B was split into two ranges, the returned array will be [updatedA, D, E, updatedC].



<br>

## Signature of getUpdatedRanges()

```javascript
getUpdatedRanges(
   ranges: vscode.Range[],
   changes: vscode.TextDocumentContentChangeEvent[],
   options?: {
		onDeletion?: 'remove'|'shrink',
		onAddition?: 'remove'|'extend'|'split',
		debugConsole?: boolean,
		outputChannel?: vscode.OutputChannel
   }
): vscode.Range[]
```

<br>

## Feedback

You can use the Issues tab of the library's repository for any questions, suggestions, issues you have.

#### If it gets the wrong updated location

- Enabling the ```debugConsole``` and ```outputChannel``` options, will help in gathering some of the data: document change ranges, to update ranges, and updated ranges.

- In this case, the updated ranges from the logs, will be the wrong ones. So what else should be provided in the opened issue, will be the correct updated ranges.
