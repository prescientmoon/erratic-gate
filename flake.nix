{
  inputs.dream2nix.url = "github:nix-community/dream2nix";
  outputs = inputs:
    inputs.dream2nix.lib.makeFlakeOutputs {
      systems = [ "x86_64-linux" ];
      config.projectRoot = ./.;
      source = ./.;
      projects = ./projects.toml;
    };

  # {{{ Caching and whatnot
  nixConfig = {
    # extra-substituters = [
    #   "erratic-gate.cachix.org-1:Ijiu/v//aVpKO4xBqV+2AM2s2uQYOnGCfoj9fYRXxtk" # I think I need this for neovim-nightly?
    # ];
    #
    # extra-trusted-public-keys = [
    #   "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    # ];
  };
  # }}}
}
