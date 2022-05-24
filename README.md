# Creating a Pre-publish Checklist in Gutenberg Workshop - WCEU 2022

## Pre-Workshop Setup Checklist

Before arriving on the day of the workshop, please ensure you have the following in place ( this is meant to help avoid wifi issues on the day):

1. Ensure you have Composer and Node version 16 installed on your laptop. I would strongly recommend using [Node Version Manager ( NVM )](https://github.com/nvm-sh/nvm) to manage your node versions. ( If Composer is an issue, it is technically optional. We will need Node however ).
2. A working local development environment running the latest version of WordPress. I will be using [LocalWP](https://localwp.com/) but you can use anything you're comfortable with.
3. The code from either this repo, or a fork of it, cloned into the `wp-content/plugins/` directory. ( i.e `git clone https://github.com/ryanwelcher/prepublish-checklist wp-content/plugins` from the root of your WordPress installation )
4. Run `npm install --force` and `composer install` to download all of the dependencies.


## Welcome!
I so happy to decided to join me today for this Workshop on creating a Pre-publish checklist in Gutenberg!

We only have a short time together today so I wil try to keep things moving as quickly as possible but please feel free to ask me any questions you may have along the way!

## What are we doing today?
**To save time and get right into coding, all of the setup for the plugin is in-place and ready to go. This means we won't be able cover topics related to the build process or using the `@wordpress/scripts` package beyond running some commands. If you're interested in this, please be sure to ask me after the workshop and I'll be happy to talk to you about it!**

Today, we'll be working to complete a partially built plugin that will restrict the ability to publish a post until a set of predefined publishing requirements are met.


To accomplish this goal, there are two sections of the plugin:

### Admin Screen
There is a custom settings screen called Pre-publish Checklist to allow defining the following criteria:

1. How many words are required?
2. Is a Featured image required?
3. Are categories required to be assigned?

This screen is pre-built ( the code is in the `./src/admin` directory ) and will not be part of the coding work done in the workshop.


### Plugin
This section contains all of the logic and SlotFills that make up the functionality of the pre-publish checklist and is where we will be spending our time today.

## **Structure and Reference Code**
There are 5 sections to the workshop that each build off of the work done in the previous section each has its own markdown file contained in the `workshop-outline` directory.
For reference, there are directories available in `./code-reference` for each section that contain the code that you should have at the beginning the section (`section-2-begin.js`) and the code that you have at the end of section (`section-2-end.js`). If you become lost or just want a clean start to a section, feel free to copy and paste away!

## **Let's go!**

Let's get started by jumping to [Section 1](./workshop-outline/section-1.md)
