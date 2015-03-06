$(document).ready(function() {
  var ip_dotted = $("#ip_dotted")
  var ip_oct = $("#ip_oct")
  var ip_hex = $("#ip_hex")
  var ip_int = $("#ip_int")

  ip_dotted.on('change', function() {
    ip = ip_dotted.val()
    ip_oct.val(dotted2oct(ip))
    ip_int.val(dotted2int(ip))
    ip_hex.val(dotted2hex(ip))
  })

  ip_oct.on('change', function() {
    ip = ip_oct.val()
    ip_dotted.val(oct2dotted(ip))
    ip_int.val(oct2int(ip))
    ip_hex.val(oct2hex(ip))
  })

  ip_hex.on('change', function() {
    ip = ip_hex.val().replace("0x","")
    ip_dotted.val(hex2dotted(ip))
    ip_int.val(hex2int(ip))
    ip_oct.val(hex2oct(ip))
  })

  ip_int.on('change', function() {
    ip = ip_int.val()
    ip_dotted.val(int2dotted(ip))
    ip_hex.val(int2hex(ip))
    ip_oct.val(int2oct(ip))
  })

});

function int2dotted(ip)
{
  ip = parseInt(ip, 10)
  brackets = []
  for(var i = 0; i < 4; i++){
    brackets[i] = (ip >> 8*(3 - i)) & 0xFF
  }
  return brackets.join(".")
}

function int2oct(ip)
{
  ip = parseInt(ip, 10)
  brackets = []
  for(var i = 0; i < 4; i++){
    brackets[i] = (ip >> 8*(3 - i)) & 0xFF
    brackets[i] = brackets[i].toString(8)
  }
  return brackets.join(".")
}

function int2hex(ip)
{
  ip = parseInt(ip, 10).toString(16)
  return "0x" + ip
}

function hex2dotted(ip)
{
  ip = parseInt(ip, 16)
  brackets = []
  for(var i = 0; i < 4; i++){
    brackets[i] = (ip >> 8*(3 - i)) & 0xFF
  }
  return brackets.join(".")
}

function hex2oct(ip)
{
  ip = parseInt(ip, 16)
  brackets = []
  for(var i = 0; i < 4; i++){
    brackets[i] = (ip >> 8*(3 - i)) & 0xFF
    brackets[i] = brackets[i].toString(8)
  }
  return brackets.join(".")
}

function hex2int(ip)
{
  ip = parseInt(ip, 16).toString(10)
  return ip
}

function oct2dotted(ip) {
  brackets = ip.split(".")
  $.each(brackets, function(index, item) {
    brackets[index] = parseInt(item, 8).toString(10)
  })
  return brackets.join(".")
}

function oct2int(ip) {
  brackets = ip.split(".")
  var ip = 0;
  $.each(brackets, function(index, item) {
    ip += (parseInt(item, 8) & 0xFF ) << 8*(3 - index) 
  })
  return ip
}

function oct2hex(ip) {
  var ip = oct2int(ip)
  return "0x" + ip.toString(16)
}

function dotted2oct(ip) {
  brackets = ip.split(".")
  $.each(brackets, function(index, item) {
    brackets[index] = parseInt(item).toString(8)
  })
  return brackets.join(".")
}

function dotted2int(ip) {
  brackets = ip.split(".")
  var ip = 0;
  $.each(brackets, function(index, item) {
    ip += (parseInt(item) & 0xFF ) << 8*(3 - index) 
  })
  return ip
}

function dotted2hex(ip) {
  var ip = dotted2int(ip)
  return "0x" + ip.toString(16)
}
