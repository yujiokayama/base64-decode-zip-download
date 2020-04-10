window.addEventListener("load", function () {
  base64Data = {
    image: {
      data:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAAAAAAZai4+AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBAcHBQPIZ943AAACaElEQVR42u3V3XKiMAAF4L7/G5xErYBaq9v6s6OtLlD/ocBDbQCB7Ey7FbgwF+fcSIA5fgYTHhIj83BvAFlkkUUWWWQZErLIIsuEkEUWWSaELLLIMiFkkUWWCSGLLLJMCFlkkWVCyCKLLBNCFllkmRCyyLoD6wXXgz2K+Okwfht05OAtvqm/Ycn3rM9O0bj9pzEa5cej6AZV05JvWeEYReMSIz9PqEYzyNUpeJOY/axqXPI1K5g/SZSNUyy0S4Cbfv6BCP5valPyNWuXT/F1NMCmurRCPz94xKqclB5+ZwcvsOOmJTewouPx6JaNHeyrS8+Y5wdzTMqTLsRRfXzkHw1LfmalORWNIfDx3BP2r3M6srDNT29hVTdPMYiTqH+dtIYl9Vjl0pbv2a/289M+utXNYRfrZJHaWpTUY20A2wsCz84ekcAhP32A0O52IV0hTu1KarH812W2u8Q2xkkiq0ap3z5VM7FqW1KHVcZLZ7xfzX9fv6geoxO3LWnEUrtNkAyrf+tQv3gQkJe2JY1YYdo4KbbFJabatchCF08tS+qwYutxW8y4mv91saQttfaqLOCcpb5jNimpNVtjWJ9ZtYPXJLkI7NLRDkJ7Zvt0ga3RCdqU1GOpLcfxgovnoJt2zNDzosTv6W9Z9QgX2VdOWpTUZCUbke+E3ewXRkNAqHfwSFt3c1jp8ld/e7d5SV1Wcp5ZUtqLMB/Fa0dKZ60Vqpfy7srrhU1LbmTdNWSRRZYJIYssskwIWWSRZULIIossE0IWWWSZELLIIsuEkEUWWSaELLLIMiFkkUWWCSGLLLJMCFlkkWVC/gI+i6YMw2buTAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNC0wN1QxNjowNTowMyswOTowMI8uM50AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDQtMDdUMTY6MDU6MDMrMDk6MDD+c4shAAAAAElFTkSuQmCC",
      name: "base64_image.png",
    },
    text: {
      data:
        "YmFzZTY044Gn44Ko44Oz44Kz44O844OJ44GV44KM44Gf44OG44Kt44K544OI44OH44O844K/44Gn44GZ44KI",
      name: "base64_text.txt",
    },
  };

  function downloadImage(data, name) {
    var zip = new JSZip();
    zip.file(name, data.split(",")[1], { base64: true });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, name.split(".")[0] + ".zip");
    });
  }

  function downloadText(data, name) {
    var zip = new JSZip();
    zip.file(name, data, { base64: true });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, name.split(".")[0] + ".zip");
    });
  }
  /**
   * Base64Text => decode => blob
   * @param {String} base64
   * @return {Object}
   */
  var decodeBase64Text = function (base64) {
    try {
      var blob = new Blob([decodeURIComponent(escape(atob(base64)))], {
        type: "text/plain",
      });
    } catch (e) {
      return false;
    }
    return blob;
  };

  /**
   * Base64Image => decode => blob
   * @param {String} base64
   * @return {Object}
   */
  var decodeBase64Image = function (base64) {
    var bin = atob(base64.replace(/^.*,/, ""));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    try {
      var blob = new Blob([buffer.buffer], {
        type: "image/png",
      });
    } catch (e) {
      return false;
    }
    return blob;
  };

  document.querySelector("#DL_IMAGE").addEventListener("click", function () {
    downloadImage(base64Data.image.data, base64Data.image.name);
  });

  document.querySelector("#DL_TEXT").addEventListener("click", function () {
    downloadText(base64Data.text.data, base64Data.text.name);
  });
});
