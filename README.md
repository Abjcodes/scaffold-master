# scaffold-kit

## Scaffold Kit - NPM Package Documentation

## Table of Contents

1. [What is Scaffold-kit?](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
    - [Getting Started](#getting-started)
    - [Creating a Project](#creating-a-project)
    - [Custom Boilerplate](#custom-boilerplate)
4. [Dependencies](#dependencies)
5. [Contributing](#contributing)
6. [License](#license)

## 1. What is Scaffold-kit?

Scaffold Kit is a lightweight npm package that helps to generate, create and manage boilerplates so they can be reproduced easily. Boilerplates can be anything from code snippet files to production-ready templates.

## 2. Installation

To install Scaffold Kit, make sure you have Node.js and npm installed, then run the following command:

```bash
npm install -g scaffold-kit
```

This will install Scaffold Kit globally on your system, allowing you to use it from anywhere in the terminal

3\. Usage
---------

### 3.1 Getting Started

Once Scaffold Kit is installed, you can use it by running the `sk-generate` command in your terminal:

`sk-generate`

This will present you with a list of available boilerplate templates.

### 3.2 Generating a boilerplate

To create a new project using Scaffold Kit, follow these steps:

1.  Run `sk-generate` in your terminal.
2.  Choose the desired boilerplate template from the list.

After providing all the required information, Scaffold Kit will copy the selected boilerplate template to your current working directory.

### 3.3 Saving your own boilerplate

Scaffold Kit also allows you to add your custom boilerplate templates. To do this, follow these steps:

1.  Type `sk-create` in your terminal.
2.  Enter the folder name for your custom boilerplate.
3.  Select the files to ignore.

Your custom boilerplate template will be saved and can be used for future projects.

### 3.4 Deleting saved boilerplates

You can remove any saved boilerplates using Scaffold-kit. To do this, follow these steps:

1. Type `sk-delete` in your terminal.
2. Select the boilerplate you want to delete from the list of saved boilerplates

The boilerplate which you selected will be deleted. This action is irreversible.

4\. Contributing
----------------

If you would like to contribute to Scaffold Kit, feel free to open issues or submit pull requests on the project's GitHub repository. Your contributions are highly appreciated!

5\. License
-----------

Scaffold Kit is open-source software licensed under the MIT License. 

* * * * *

Thank you for using Scaffold Kit! If you encounter any issues or need further assistance, please don't hesitate to reach out to us on the GitHub repository. Happy coding!
