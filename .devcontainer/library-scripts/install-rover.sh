#!/usr/bin/env bash

# Install Apollo Rover CLI
# Build from source if running on ARM (see https://github.com/apollographql/rover/issues/582)
if [ "$(arch)" = "aarch64" ]; then
  curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain nightly -y ;
  . $HOME/.cargo/env
  cargo install --git https://github.com/apollographql/rover.git rover ;
else
  npm install -g @apollo/rover ;
fi
