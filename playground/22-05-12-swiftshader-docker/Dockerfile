FROM ubuntu:18.04 AS builder

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates git libx11-dev libxext-dev make python3 \
      software-properties-common wget zlib1g-dev
RUN add-apt-repository ppa:ubuntu-toolchain-r/test
RUN apt-get install -y --no-install-recommends gcc-9 g++-9
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 1
RUN update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-9 1
RUN update-alternatives --install /usr/bin/cc cc /usr/bin/gcc 1
RUN update-alternatives --install /usr/bin/c++ c++ /usr/bin/g++ 1
RUN wget https://github.com/Kitware/CMake/releases/download/v3.20.0/cmake-3.20.0-linux-x86_64.sh
RUN sh cmake-3.20.0-linux-x86_64.sh --prefix=/usr/local --exclude-subdir

ENV COMMIT=fb53aa2bb7dad9de683d963b5e5d30c40bbf16e1

RUN git clone https://github.com/google/swiftshader.git
WORKDIR /swiftshader
RUN git checkout $COMMIT
WORKDIR /swiftshader/build
RUN cmake ..
RUN cmake --build . -j8


FROM busybox:1.32.1
COPY --from=builder /swiftshader/build/Linux/* /build/
