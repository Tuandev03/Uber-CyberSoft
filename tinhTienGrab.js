// Phân tích các xử lí tính tiền grab

/**
 * 1. Tạo sự kiện onclick cho nút tính tiền
 * 2. Lấy dữ liệu từ trên layout khi người dùng nhập xong
 * 3. Thực hiện xử lý kiểm tra xem người dùng đã đi phương tiện gì  để lấy ra được  giá tiền
 * 4. Thực hiện kiểm tra số km đi, để tính toán  ra giá tiền
 * 5. Thực hiện xử lý đưa dữ liệu lên giao diện cho người dùng thấy
 */

var $$ = document.querySelectorAll.bind(document);
var $ = document.querySelector.bind(document);

const UBER_CAR = "uberCar";
const UBER_SUV = "uberSUV";
const UBER_BLACK = "uberBlack";

var btnTinhTien = $("#btnTinhTien");
btnTinhTien.onclick = () => {
  var soKm = $("#txt-km").value * 1;
  // gọi tới thuộc tính input có thuộc tính name= selector  và được người dùng chọn bằng thuộc tính checked
  var checkLoaiXe = $("input[name='selector']:checked").value;
  var soThoiGianCho = $("#txt-thoiGianCho").value * 1;

  var giaTienKmDauTien = tienKmDauTien(checkLoaiXe);
  var giaTienKmTu1Den19 = tienKmTu1Den19(checkLoaiXe);
  var giaTienKmTu19TroLen = tienKmTu19TroLen(checkLoaiXe);
  var thanhTien = $("#xuatTien");
  var showThanhTien = $("#divThanhTien");
  var tongTien = 0;
  var tienCho = 0;

  if (soKm <= 1) {
    tongTien = soKm * giaTienKmDauTien;
  } else if (soKm > 1 && soKm <= 19) {
    tongTien = giaTienKmDauTien * 1 + (soKm - 1) * giaTienKmTu1Den19;
  } else {
    tongTien =
      giaTienKmDauTien * 1 +
      18 * giaTienKmTu1Den19 +
      (soKm - 19) * giaTienKmTu19TroLen;
  }

  // Tính thời gian chờ
  if (soThoiGianCho >= 3 && checkLoaiXe == UBER_CAR) {
    tienCho = (soThoiGianCho / 3) * 2000;
  } else if (soThoiGianCho >= 3 && checkLoaiXe == UBER_SUV) {
    tienCho = (soThoiGianCho / 3) * 3000;
  } else {
    tienCho = (soThoiGianCho / 3) * 3500;
  }
  tongTien = tongTien + tienCho;
  showThanhTien.style.display = "block";
  thanhTien.innerHTML =
    tongTien.toLocaleString({
      style: "currency",
      currency: "VND",
    }) + "VNĐ";

  // Tính thời gian chờ tron in hóa đơn
  // Kiểm tra người dùng đi loại xe nào  thì sẽ tính tiền
  // if (checkLoaiXe == UBER_CAR) {
  //   giaTienKmDauTien = 8000;
  //   giaTienKmTu1Den19 = 7500;
  //   giaTienKmTu19TroLen = 7000;
  // } else if (checkLoaiXe == UBER_BLACK) {
  //   giaTienKmDauTien = 9000;
  //   giaTienKmTu1Den19 = 8500;
  //   giaTienKmTu19TroLen = 8000;
  // } else {
  //   giaTienKmDauTien = 10000;
  //   giaTienKmTu1Den19 = 9000;
  //   giaTienKmTu19TroLen = 5000;
  // }
  //  cấu trúc điều kiện switch case
  // case: là những trường hợp  mà phần tử so sánh và thực hiện
  // break: giúp thoát khỏi cấu trúc switch case  khi có  một trường hợp thỏa mãn yêu cầu
  // default: Luôn để dưới cùng
  // switch (checkLoaiXe) {
  //   //  Nơi xử lý các hành động
  //   case UBER_CAR:
  //     {
  //       giaTienKmDauTien = 8000;
  //       giaTienKmTu1Den19 = 7500;
  //       giaTienKmTu19TroLen = 7000;
  //     }
  //     break;
  //   case UBER_SUB:
  //     {
  //       giaTienKmDauTien = 9000;
  //       giaTienKmTu1Den19 = 8500;
  //       giaTienKmTu19TroLen = 8000;
  //     }
  //     break;

  //   default: {
  //     giaTienKmDauTien = 10000;
  //     giaTienKmTu1Den19 = 9000;
  //     giaTienKmTu19TroLen = 5000;
  //   }
  // }

  btnHoaDon = $("#btn-inHoaDon ");
  btnHoaDon.onclick = () => {
    console.log(btnInPdf)
    $("#exampleModal").style.display = "block";
    var tongTienHoaDon = $(".tongTienHoaDon");

    // Lấy giá trị trong bảng
    var soThoiGianChoHoaDon = $("#txt-thoiGianCho").value * 1;
    var donGiaKmDauTien = $(".dg_kmDauTien");
    var thanhTienKmDauTien = $(".tt_kmDauTien");

    //  Lấy giá trị  km từ 1 đến 19
    var suDungKmTu1Den19 = $(".sd_KmTu1Den19");
    var donGiaKmTu1Den19 = $(".dg_KmTu1Den19");
    var thanhTienKmTu1Den19 = $(".tt_KmTu1Den19");
    // Lấy giá trị km từ 19 trở lên
    var suDungKm19TroLen = $(".sd_Km19TroLen");
    var donGiaKm19TroLen = $(".dg_Km19TroLen");
    var thanhTienKm19TroLen = $(".tt_Km19TroLen");
    // Tính thời gian chờ trong in hóa đơn
    var suDungThoiGianCho = $(".sd_thoiGianCho");
    var thanhTienThoiGianCho = $(".tt_thoiGianCho");
    tongTienHoaDon.innerHTML = `Tổng tiền: ${tongTien}`;

    if (checkLoaiXe == UBER_CAR) {
      thanhTienThoiGianCho.innerHTML = tienCho;
      donGiaKmDauTien.innerHTML = 8000;
      donGiaKmTu1Den19.innerHTML = 7500;
      donGiaKm19TroLen.innerHTML = 7000;

      if (soKm >= 19) {
        suDungKm19TroLen.innerHTML = `${soKm} Km`;
        thanhTienKm19TroLen.innerHTML = `${tongTien - tienCho}`;
      } else {
        suDungKmTu1Den19.innerHTML = `${soKm} Km`;
        thanhTienKmTu1Den19.innerHTML = `${tongTien - tienCho}`;
      }
    } else if (checkLoaiXe == UBER_SUV) {
      thanhTienThoiGianCho.innerHTML = tienCho;
      donGiaKmDauTien.innerHTML = 9000;
      donGiaKmTu1Den19.innerHTML = 8500;
      donGiaKm19TroLen.innerHTML = 8000;

      if (soKm >= 19) {
        suDungKm19TroLen.innerHTML = `${soKm} Km`;
        thanhTienKm19TroLen.innerHTML = `${tongTien - tienCho}`;
      } else {
        suDungKmTu1Den19.innerHTML = `${soKm} Km`;
        thanhTienKmTu1Den19.innerHTML = `${tongTien - tienCho}`;
      }
    } else {
      thanhTienThoiGianCho.innerHTML = tienCho;
      donGiaKmDauTien.innerHTML = 10000;
      donGiaKmTu1Den19.innerHTML = 9500;
      donGiaKm19TroLen.innerHTML = 9000;

      if (soKm > 19) {
        suDungKm19TroLen.innerHTML = `${soKm} Km`;
        thanhTienKm19TroLen.innerHTML = `${tongTien - tienCho}`;
      } else {
        suDungKmTu1Den19.innerHTML = `${soKm} Km`;
        thanhTienKmTu1Den19.innerHTML = `${tongTien - tienCho}`;
      }
    }
    suDungThoiGianCho.innerHTML = soThoiGianChoHoaDon;
      tongTien.toLocaleString({
        style: "currency",
        currency: "VND",
      }) + " VNĐ";
  };
};

// Tạo ra một hàm giúp kiểm tra và trả về giá tiền km đầu tiên
var tienKmDauTien = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR: {
      return 8000;
    }
    case UBER_SUV: {
      return 9000;
    }

    default: {
      return 10000;
    }
  }
};

var tienKmTu1Den19 = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR: {
      return 7500;
    }
    case UBER_SUV: {
      return 8500;
    }
    default: {
      return 9500;
    }
  }
};
var tienKmTu19TroLen = (loaiXe) => {
  switch (loaiXe) {
    case UBER_CAR: {
      return 7000;
    }
    case UBER_SUV: {
      return 8000;
    }
    default: {
      return 9000;
    }
  }
};
// modal
var btnInPdf = $(".btn-inPdf");
btnInPdf.onclick= () => {
  window.print()
}
