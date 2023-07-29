# scaffold-kit

## Scaffold Kit - NPM Package Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
    - [Getting Started](#getting-started)
    - [Creating a Project](#creating-a-project)
    - [Custom Boilerplate](#custom-boilerplate)
4. [Dependencies](#dependencies)
5. [Contributing](#contributing)
6. [License](#license)

## 1. Introduction

Scaffold Kit is an npm package that provides boilerplate templates for various projects, making it easy to start new projects with the necessary structure and configuration. This documentation provides detailed instructions on how to install and use Scaffold Kit for generating project templates.

## 2. Installation

To install Scaffold Kit, make sure you have Node.js and npm installed, then run the following command:

```bash
npm install -g scaffold-kit
```

This will install Scaffold Kit globally on your system, allowing you to use it from anywhere in the terminal

3\. Usage
---------

### 3.1 Getting Started

Once Scaffold Kit is installed, you can use it by running the `scaffold` command in your terminal:

`scaffold`

This will present you with a list of available boilerplate templates to choose from.

### 3.2 Creating a Project

To create a new project using Scaffold Kit, follow these steps:

1.  Run `scaffold` in your terminal.
2.  Choose the desired boilerplate template from the list.
3.  Enter the necessary project information when prompted (e.g., project name, version, description, author).
4.  Select the additional dependencies you want to include in your project.

After providing all the required information, Scaffold Kit will copy the selected boilerplate template to your current working directory, along with the specified package.json or manifest.json updates.

### 3.3 Custom Boilerplate

Scaffold Kit also allows you to add your custom boilerplate templates. To do this, follow these steps:

1.  Type `cb` in your terminal.
2.  Enter the folder name for your custom boilerplate.
3.  Answer a series of questions regarding the boilerplate configuration, such as files to ignore.

Your custom boilerplate template will be saved and can be used for future projects.

4\. Dependencies
----------------

When creating a project using Scaffold Kit, you have the option to select additional dependencies to include. The available dependencies are presented in a checklist format, and you can choose the ones you need for your project.

5\. Contributing
----------------

If you would like to contribute to Scaffold Kit, feel free to open issues or submit pull requests on the project's GitHub repository. Your contributions are highly appreciated!

6\. License
-----------

Scaffold Kit is open-source software licensed under the MIT License. 

* * * * *

Thank you for using Scaffold Kit! If you encounter any issues or need further assistance, please don't hesitate to reach out to us on the GitHub repository. Happy coding!
