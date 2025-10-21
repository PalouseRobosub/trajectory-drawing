# -*- mode: python ; coding: utf-8 -*-

import sys

if sys.platform.startswith("win"):
    icon_file = "icon.ico"
elif sys.platform == "darwin":
    icon_file = "icon.icns"
else:
    icon_file = "icon.png"

a = Analysis(
    ['./main.py'],
    pathex=[],
    binaries=[],
    datas=[('./out', './out')],
    hiddenimports=['flask'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='robosub-trajectory-drawing',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=icon_file,
)
