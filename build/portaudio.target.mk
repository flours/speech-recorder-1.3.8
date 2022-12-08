# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := portaudio
### Generated for copy rule.
/home/pptruser/node_modules/speech-recorder/build/Release/libportaudio.so.2: TOOLSET := $(TOOLSET)
/home/pptruser/node_modules/speech-recorder/build/Release/libportaudio.so.2: /home/pptruser/node_modules/speech-recorder/portaudio/lib/linux/libportaudio.so.2 FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += /home/pptruser/node_modules/speech-recorder/build/Release/libportaudio.so.2
binding_gyp_portaudio_target_copies = /home/pptruser/node_modules/speech-recorder/build/Release/libportaudio.so.2

DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=portaudio' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG' \
	'-DV8_ENABLE_CHECKS'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++1y

INCS_Debug := \
	-I/root/.cache/node-gyp/10.24.1/include/node \
	-I/root/.cache/node-gyp/10.24.1/src \
	-I/root/.cache/node-gyp/10.24.1/deps/openssl/config \
	-I/root/.cache/node-gyp/10.24.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/10.24.1/deps/uv/include \
	-I/root/.cache/node-gyp/10.24.1/deps/zlib \
	-I/root/.cache/node-gyp/10.24.1/deps/v8/include \
	-I$(srcdir)/../nan \
	-I$(srcdir)/portaudio/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=portaudio' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DOPENSSL_NO_PINSHARED' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++1y

INCS_Release := \
	-I/root/.cache/node-gyp/10.24.1/include/node \
	-I/root/.cache/node-gyp/10.24.1/src \
	-I/root/.cache/node-gyp/10.24.1/deps/openssl/config \
	-I/root/.cache/node-gyp/10.24.1/deps/openssl/openssl/include \
	-I/root/.cache/node-gyp/10.24.1/deps/uv/include \
	-I/root/.cache/node-gyp/10.24.1/deps/zlib \
	-I/root/.cache/node-gyp/10.24.1/deps/v8/include \
	-I$(srcdir)/../nan \
	-I$(srcdir)/portaudio/include

OBJS := \
	$(obj).target/$(TARGET)/src/portaudio.o \
	$(obj).target/$(TARGET)/src/GetDevices.o \
	$(obj).target/$(TARGET)/src/AudioIn.o \
	$(obj).target/$(TARGET)/src/common.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# Make sure our actions/rules run before any of us.
$(OBJS): | $(binding_gyp_portaudio_target_copies)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
# Build our special outputs first.
$(obj).target/portaudio.node: | $(binding_gyp_portaudio_target_copies)

# Preserve order dependency of special output on deps.
$(binding_gyp_portaudio_target_copies): | 

LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64 \
	-Wl,-rpath,'$$ORIGIN/'

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64 \
	-Wl,-rpath,'$$ORIGIN/'

LIBS := \
	/home/pptruser/node_modules/speech-recorder/build/Release/libportaudio.so.2

$(obj).target/portaudio.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/portaudio.node: LIBS := $(LIBS)
$(obj).target/portaudio.node: TOOLSET := $(TOOLSET)
$(obj).target/portaudio.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/portaudio.node
# Add target alias
.PHONY: portaudio
portaudio: $(builddir)/portaudio.node

# Copy this to the executable output path.
$(builddir)/portaudio.node: TOOLSET := $(TOOLSET)
$(builddir)/portaudio.node: $(obj).target/portaudio.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/portaudio.node
# Short alias for building this executable.
.PHONY: portaudio.node
portaudio.node: $(obj).target/portaudio.node $(builddir)/portaudio.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/portaudio.node

