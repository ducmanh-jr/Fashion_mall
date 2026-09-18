@echo off
chcp 65001 >nul
pushd "%~dp0main"
call start-all.cmd
popd
