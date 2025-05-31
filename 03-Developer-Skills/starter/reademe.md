1. We can use prettier to properly format the code and its looks but its completely optional and if you want then dont use it.

2. But its good to use it because it maintains the consistency and helps when colaborating with other developers.

3. can use prettier using these steps:-

Install the prettier extension.
Go to settings and search "format", 
Then in "Editor: default formatter" choose the prettier option.
Then go to "Editor: format on save" and just check the box.
Then you are all set.
And you can also create a ".prettierrc" file to config the prettier.

--NEXT-- BREAK

We configured our snippits in vs code.
We went in preferences then configure snippits.
Then we created this "suraj.code-snippets".
In which we can make our own snippits.
As i have created my snippt for console.log().

EXAMPLE SNIPPIT CODE:-

"
{
	// Place your global snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:

	
	"Print to console": {
		"scope": "javascript,typescript",
		"prefix": "cl",
		"body": [
			"console.log();"
			
		],
		"description": "Log output to console"
	}
}
"

NEXTPART


Then we used the extension called "todo highlight".
this is the use of it:- BUG, COMPLETED,FIXME,NEXTPART,and we can make much more.
We just have to go to the settings then click on the top right button which says "open settings in json", and in that we can make changes to all of it like shown below:-


This is the code to configure the "TODO HIGHLIGHT".
"
{
  "workbench.colorTheme": "Tomorrow Night Blue",
  "workbench.startupEditor": "none",
  "files.autoSave": "onFocusChange",

  "todohighlight.isCaseSensitive": true,
  "todohighlight.keywords": [

    
     {
      "text": "NEXTPART",
      "color": "#333",
      "backgroundColor": "#3498db"
    },
     {
      "text": "FIXME",
      "color": "#333",
      "backgroundColor": "#e67e22"
    },
    {
      "text": "BUG",
      "color": "#333",
      "backgroundColor": "red"
    },
    {
      "text": "COMPLETED",
      "color": "#333",
      "backgroundColor": "green"
    },
     

  ]
}


"
BREAK