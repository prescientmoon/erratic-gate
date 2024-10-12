{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      rec {
        packages.erratic-gate = pkgs.buildNpmPackage.override { stdenv = pkgs.stdenvNoCC; } {
          name = "erratic-gate";
          src = pkgs.lib.cleanSource ./.;

          npmDepsHash = "sha256-f5mw6IjkhZgsIuzCz9d7DvoAdceY1y+yWXn1BOonsVI=";

          installPhase = ''
            mkdir $out
            cp -r dist $out/www
          '';
        };

        packages.default = packages.erratic-gate;
      }
    );
}
