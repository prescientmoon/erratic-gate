{
  description = "Logic gate simulator";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in
      rec {
        packages.erratic-gate = pkgs.buildNpmPackage {
          name = "erratic-gate";

          buildInputs = [ pkgs.nodejs_18 ];

          src = pkgs.lib.cleanSource ./.;
          npmDepsHash = "sha256-f5mw6IjkhZgsIuzCz9d7DvoAdceY1y+yWXn1BOonsVI=";

          ESBUILD_BASEURL = "";

          installPhase = ''
            mkdir $out
            cp -r dist $out/www
          '';
        };

        packages.erratic-gate-github-pages = packages.erratic-gate.overrideAttrs {
          ESBUILD_BASEURL = "/erratic-gate";
        };

        packages.default = packages.erratic-gate;

        devShells.default =
          pkgs.mkShell {
            buildInputs = with pkgs;
              with nodePackages_latest; [
                nodejs
              ];
          };

        apps.compute-npm-dep-hash = {
          type = "app";
          program = pkgs.lib.getExe (pkgs.writeShellApplication {
            name = "generate-layout-previes";
            runtimeInputs = [ pkgs.prefetch-npm-deps ];
            text = "prefetch-npm-deps ./package-lock.json";
          });
        };
      }
    );

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

