# Users UI

Front end for the users manager. List people, search them, filter by gender, add, edit, and delete. Built with React and TypeScript.

## API

Needs the Java server running on port 8080:

https://github.com/alexandrosgialantzis/Users-api

The proxy line in `package.json` sends every call under `/api` there during development, which is why the axios base url is just `/api` and no host is written in the code.

## What it does

The users page holds the list, with paging ten at a time, a search box, and a gender filter. Search is debounced, so typing does not fire a call per keystroke. Any filter change resets you to page one.

Rows open a detail modal. Edit opens a form modal on the same data. Every action shows a toast.

## Form validation

`useUserForm` holds the form state, the errors, and which fields you have touched.

Errors only appear once a field has been touched, so a fresh form is not covered in red before you type. After that, each keystroke revalidates just that one field.

The same hook serves the register page and the edit modal.

## Errors

The axios instance has one response interceptor. It digs the message out of wherever the server put it, `message`, `error`, or the axios default, and rejects with a plain Error.

So every page catches the same shape and never has to know how the server phrased it.

## Layout

```
src/api/users.ts    axios instance and the calls
src/hooks/          form state and toasts
src/pages/          home, register, users
src/components/     rows, modals, pagination, states
src/types/          shared interfaces
```

The empty, error, and loading states are their own components, so the pages read as a list of cases instead of nested ternaries.

## Run it

```
git clone https://github.com/alexandrosgialantzis/Users-ui.git
npm install
npm start
```

Start the API first on port 8080, or every call returns nothing.
