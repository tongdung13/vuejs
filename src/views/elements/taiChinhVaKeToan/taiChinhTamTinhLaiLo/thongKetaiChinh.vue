<template>
  <div class="bg-8 pt-3">
    <div class="text-center" style="position: relative">
      <span style="font-size: 15px; font-weight: bold"
        >BẢNG THỐNG KÊ TÀI CHÍNH</span
      ><br />
      <div>
        <div>
          (Ban hành theo Thông tư số 133/2016/TT-BTC ngày 26/8/2016 của Bộ Tài
          Chính)
        </div>
        <div
          class="bg-16 pl-3 pr-3 p-1 xuatBaoCao color-main"
          style="position: absolute; right: 0; top: 0"
        >
          Xuất báo cáo
        </div>
      </div>
    </div>
    <div class="table-responsive mt-2">
      <table class="table table-borderless">
        <thead>
          <tr class="bg-tr">
            <th></th>
            <th>Chỉ tiêu</th>
            <th>Mã</th>
            <th>Thuyết minh</th>
            <th>Số năm nay</th>
            <th>Số năm trước</th>
            <!-- <th>TK ghi nợ</th>
            <th>TK ghi có</th> -->
            <th>Lưu ý</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td style="width: 15%">Doanh thu bán hàng và cung cấp dịch vụ</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td></td>
            <td></td> -->
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Các khoản giảm trừ doanh thu</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td></td>
            <td></td> -->
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              Doanh thu thuần về bán hàng và cung cấp dịch vụ (10 = 01 - 02)
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td></td>
            <td></td> -->
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Giá vốn hàng bán</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td></td>
            <td></td> -->
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              Lợi nhuận gộp về bán hàng và cung cấp dịch vụ (20 = 10 - 11)
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td></td>
            <td></td> -->
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "thongKeTaiChinh",
};
</script>
<style scoped>
.bg-tr {
  background: linear-gradient(96.98deg, #8f41ff 0%, #4423ff 100%);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  color: white;
  font-weight: 100 !important;
}
th {
  font-weight: 100 !important;
}
.xuatBaoCao:hover {
  background: #d4476f;
  cursor: pointer;
  color: white;
}
</style>
