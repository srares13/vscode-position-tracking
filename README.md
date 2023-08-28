## Description

If you have some location in the document of which you want to know what would be its new location according to document changes, this library aims to provide you with that updated location.

### Important: 
It is an experimental library. It requires further testing regarding its ability to effectively update the wanted location.

Here if you wish, is where you could help and provide situations in which the updated location is not correct. There are debug loggings which can aid you with this. You will see more details about this below.

<br>

## Library's API

The API of this library consists in a single function that you will use.

This function is called `getUpdatedRanges()`.

<br>

## How to use

### Install the library in your project

- `npm install vscode-position-tracking`

<br>

### Example

```javascript
// Import it.
const { getUpdatedRanges } = require('vscode-position-tracking')

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
      // It is not a required argument,
      // nor any of its options.
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
The options object is not a required argument, nor any of its options.

**Available options:**

- ```onDeletion```

	- It tells what happens if a document change that consists in deletion intersects with the range you want to update.

	- **Values:**

		- ```'remove'```

			Removes the range. In other words, the returned array will not contain that range or its update.

			![onDeletion - remove](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXN3b2RqZmtudmlqdHIwbWUxNmRxejg2N2M1OGFpY2dvaXdieWZ6cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2sSfY9JKzziEx24x7V/giphy.gif)

		- ```'shrink'```

			Shrinks the range.

			![onDeletion - shrink](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWNhb283MXBvcHZwZmI5bnZsOGRmYnV5dmhraWpmcDBxbHJ4aXo5MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f4QIR9IO7wwozksuuG/giphy.gif)

	- **Default value:** ```'shrink'```

<br>

- ```onAddition```

	- It tells what happens if a document change that consists in addition intersects with the range you want to update.

	- **Values:**

		- ```'remove'```

			Removes the range. In other words, the returned array will not contain that range or its update.

			![onAddition - remove](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3E5YjNzYmFrMTZjcHdkNWZ1a2dyemlkOXU0NWpxcXpndmE5Zm55cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dBJi0ILJwyfbVpCmZI/giphy.gif)
			
		- ```'extend'```

			Extends the range.

			![onDeletion - extend](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHFldDczYzVocnVrZG5tY3RoenJrNzBwbWhjdXowbTJnaHZ0N2huNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cJw0A37IKb4iwVkQXQ/giphy.gif)

		- ```'split'```

			Splits the range.

			![onDeletion - split](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenkwdDE2OXAyajVxcmQwOTB1eHd2aXF2dmZ1aTEzYnp1amR1anVpNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zNIbL1extQDatz6Fav/giphy.gif)

	- **Default value:** ```'extend'```

<br>

- ```outputChannel```

	- It shows logs for debug purposes. For each onDidChangeTextDocument event it will log document change ranges, to update ranges, and updated ranges. The logs are shown on the terminal's output tab in the extension host window / end user window.
	
		[Debug logs example](https://drive.google.com/file/d/15jn8KgiYN9JcnVbSgmdnui5lAJ4rr9EM/view?usp=sharing)

	- **Note:**  The updated ranges are the ones that the library calculated.

	- **Values:**

		- ```vscode.outputChannel```

		<br>

	- **Default value:** ```undefined```

<br>
	
### Return value

- The updated ranges from the returned array are in the same order as the ones from the array of ranges that you want to update.

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
      outputChannel?: vscode.OutputChannel
   }
): vscode.Range[]
```

<br>

## Feedback

You can use the [Issues](https://github.com/srares13/vscode-position-tracking/issues) tab of the library's repository for any questions, suggestions and problems you have.

**If the library calculates the wrong updated location:**

Passing a vscode.OutputChannel object to the ```outputChannel``` option will help in gathering some of the data: document change ranges, to update ranges, and updated ranges. In this case, the updated ranges from the logs will be the wrong ones. So what else should be provided in the opened issue will be the correct updated ranges.
