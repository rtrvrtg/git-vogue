---
title: git-vogue
---

[![Travis Status](http://travis-ci.org/anchor/git-vogue.png)](https://travis-ci.org/anchor/git-vogue)

*git-vogue* assists developers to keep their Haskell code ["in vogue"][1].

This package defines a list of commands to check code quality, comments, and formatting continually. *git-vogue* will set up your repository to run all command pairs on commit, giving instant feedback on the quality of code, and helping fix issues more quickly.

Currently, *git-vogue* will support [hlint][2], [hspec][3], [Stylish Haskell][4] and [Haddock][5].

[1]: https://www.youtube.com/watch?v=GuJQSAiODqI
[2]: http://hackage.haskell.org/package/hlint
[3]: https://hackage.haskell.org/package/hspec
[4]: https://hackage.haskell.org/package/stylish-haskell
[5]: https://www.haskell.org/haddock/

Installation
------------

See instructions here:

[git-vogue Github page](https://github.com/anchor/git-vogue)

Rationale
---------

At *Anchor Engineering*, we've been working with Haskell for some time, and we've encountered some interesting problems along the way. A lot of these problems have to do with *code readiness*: code that is not only ready to run and deploy, but also ready to pass on to other developers so they can maintain and update it.

### Formatting

Nobody formats their code quite the same way, making it difficult for developers to pick up each other's code and read or change it. Differences in spaces verses tabs, or how methods are delimited can cause issues with a lack of standardization.

To make things easier for everyone (including yourself), we've set up *git-vogue* to use **Stylish Haskell** to check if your code conforms to a given format. If it doesn't, your commit will not be allowed to be pushed upstream, and you will instead receive a number of recommeded changes.

### Linting

Sometimes there are nicer ways to write your code than the way you're aware of. Linting can optimise your code and show you better ways to work with it. We've set up *git-vogue* to use *hlint*, which runs across your Haskell files and recommends changes to them to make them a bit nicer.

### Testing

Integration of *git-vogue* with hspec means that as long as your tests are defined as hspec-compatible, your tests will always run, making sure that you're committing compileable, correct code.

### Documentation

Don't you hate it when code isn't documented well, especially your own? *git-vogue*'s Haddock checks make sure that your modules and methods are appropriately covered for documentation, and encourages you to do that little bit extra to make sure that anyone can use your work.

Plugin design
-----------------

**The interface** for an executable is a single argument, one of:

* check
* fix
* name

The plugin can assume that the CWD will be set to the top-level directory of
the package.

The plugin will receive a list of all files in the current repository that are
not to be ignored via STDIN when running in "check" or "fix" mode. These file
paths will be absolute and newline separated.

### Rules for each plugin

* `check` shall not modify any files
* `check` may have various return values:
    * No errors - return code 0
    * Errors need fixing - return code 1
    * Catastrophic failure to check - return code 2
* `fix` is idempotent
* `fix` may have various return values:
    * The code is now good (changes may or may not have been made) - return code 0
    * Some errors remain - return code 1
    * Catastrophic failure to check - return code 2
* If `fix` returns "success" (return code 0), `check` must no longer fail

Developing a plugin
-------------------

*Anchor* has developed all its *git-vogue* plugins in Haskell, but you can implement them in any language that works with your POSIX-compatible environment. Even **bash** is suitable for writing your *git-vogue* plugins.

Simply write your plugin to discover all the files you want to `check` and/or `fix`, perform the necessary operations on them to do so, and return the result as per the rules list above.

Future versions of *git-vogue* will support limiting checking and fixing to certain sets of files only. An example of this might be checking and fixing code in `lib` directories, but not `test` scaffold directories. Please keep this in mind when developing your plugin, and be sure to isolate your file listing method appropriately.

