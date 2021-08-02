<template>
  <div class="col-md-10 res mb-5 mt-3">
    <select
      name="cars"
      class="inputx mr-3"
      id="cars"
      style="width: 30%; outline: none"
    >
      <option value="volvo">Tất cả salon</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
    <h5 class="mt-3 font-weight-bold color-main">THÊM QUY TRÌNH</h5>

    <!-- Thong tin quy trihf -->
    <div class="mt-4 bg-8 pt-3 pb-3 pl-5 pr-5">
      <h6>THÔNG TIN QUY TRÌNH</h6>
      <div class="mt-3 pb-2">
        <table class="table table-borderless">
          <tbody class="text-right">
            <tr>
              <td style="width: 15%">
                <div class="table-input">Tên quy trình:</div>
              </td>
              <td colspan="3">
                <input
                  type="text"
                  placeholder="Tên quy trình... "
                  class="w-100"
                />
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Bước 1:</div>
              </td>
              <td colspan="2">
                <textarea
                  rows="4"
                  style="width: 100%"
                  placeholder="Nhập nội dung..."
                ></textarea>
              </td>
              <td class="text-left">
                <input type="file" id="upload" hidden />
                <label for="upload">Thêm video</label>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Bước 2:</div>
              </td>
              <td colspan="2">
                <textarea
                  rows="4"
                  style="width: 100%"
                  placeholder="Nhập nội dung..."
                ></textarea>
              </td>
              <td class="text-left">
                <input type="file" id="upload" hidden />
                <label for="upload">Thêm video</label>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Bước 3:</div>
              </td>
              <td colspan="2">
                <textarea
                  rows="4"
                  style="width: 100%"
                  placeholder="Nhập nội dung..."
                ></textarea>
              </td>
              <td class="text-left">
                <input type="file" id="upload" hidden />
                <label for="upload">Thêm video</label>
              </td>
            </tr>
            <tr>
              <td>
                <div class="table-input">Bước 4:</div>
              </td>
              <td colspan="2">
                <textarea
                  rows="4"
                  style="width: 100%"
                  placeholder="Nhập nội dung..."
                ></textarea>
              </td>
              <td class="text-left">
                <input type="file" id="upload" hidden />
                <label for="upload">Thêm video</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3 text-center pb-3">
        <span class="borderx mr-2 color-main">Lưu</span>
        <span class="borderx mr-2 color-main">Lưu và Ẩn</span>
        <span class="borderx color-main">Lưu và hiển thị</span>
      </div>
    </div>
    <!-- ================== -->
  </div>
</template>
<script>
export default {
  name: "themQuyTrinh",
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.table-input {
  padding: 5px 10px;
}
.borderx {
  border: 1px solid #d4476f;
  padding: 5px 25px;
  border-radius: 4px;
  cursor: pointer;
}

.borderx:hover {
  color: white;
  background-color: #d4476f;
}

label {
  padding: 25px 15px;
  background: rgba(255, 255, 255, 0.56);
  /* shape */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

ul {
  padding: 5px 15px;
}

li {
  padding: 5px 15px;
  list-style: none;
}

.card-header {
  padding: 5px;
  border-bottom: none;
  background: rgba(255, 255, 255, 0.56);
}

.card-body {
  padding: 0;
}

.card {
  border: none;
}
@media only screen and (max-width: 768px) {
  .borderx {
    padding: 5px 15px;
  }
}
</style>
