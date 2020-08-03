## Git for Windows issue with core.symlinks=true

This repository acts as an easy way to reproduce a current issue in git for windows (v2.27.0) which is related to the `core.symlinks` setting.

### Steps to reproduce the problem:

Clone the repository locally with core.symlinks=true:

```sh
$ git -c core.symlinks=true clone https://github.com/rafeca/test-submodules-with-symlinks.git
$ cd test-submodules-with-symlinks
$ git -c core.symlinks=true submodule update --init --force --recursive
```

After cloning, there are unexpected local changes in your working directory:

```sh
$ git diff
diff --git a/gitignore b/gitignore
--- a/gitignore
+++ b/gitignore
@@ -1 +1 @@
-Subproject commit 218a941be92679ce67d0484547e3e142b2f5f6f0
+Subproject commit 218a941be92679ce67d0484547e3e142b2f5f6f0-dirty
```

Checking the status on the gitignore folder shows symlinks as modified files:

```sh
$ cd gitignore && git status
HEAD detached at 218a941
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   Clojure.gitignore
        modified:   Fortran.gitignore
        modified:   Global/Octave.gitignore
        modified:   Kotlin.gitignore

no changes added to commit (use "git add" and/or "git commit -a")
```

### Expected behaviour

After cloning the repository, both `git diff` and `git status` should show no changes.
