This project contains a minimal reproduction of an issue that have appeared recently with the GitHub-hosted `windows-2019` VMs in GitHub Actions.

In GitHub Actions, as can be seen in the [run results](https://github.com/rafeca/test-submodules-with-symlinks/runs/898580313#step:3:25) of this repository, after the `actions/checkout@v2` action finishes there are unintended local changes in the submodule.

I can confirm that this didn't happen with the `v20200630.0` version of the `windows-2019` VMs (which can be found [in this repo](https://github.com/actions/virtual-environments)). Unfortunately, it's not easy to demonstrate this from this repository since there's no way to run workflows on older versions of the VMs.

Still, this can be seen by looking at the CI results of two separate runs on the same commit of the GitHub Desktop repository:

- An old run executed on July 9th 2020 (where the VM version [was `v20200630.0`](https://github.com/desktop/desktop/runs/854464821#step:1:8)) [which passed](https://github.com/desktop/desktop/runs/854271314).
- A new run executed on July 22th 2020 (where the VM version [was `v20200714.1`](https://github.com/desktop/desktop/runs/897975189#step:1:8)) against the same commit [which failed](https://github.com/desktop/desktop/runs/898140396).

Additionally when executing similar commands on a Windows 10 machine with `git 2.27.0.windows.1` installed, I cannot see any local changes:

```sh
$ git clone https://github.com/rafeca/test-submodules-with-symlinks.git && cd test-submodules-with-symlinks
$ git submodule sync --recursive
$ git submodule update --init --force --depth=1 --recursive
$ git diff
# nothing gets printed
$ git diff --submodule=diff
# nothing gets printed
```

## Additional information

The files that appear as modified correspond to symlinks on the submodule repository. While Windows doesn't have support for symlinks, `git` shouldn't end up with a modified working copy after a checkout from GitHub Actions.
