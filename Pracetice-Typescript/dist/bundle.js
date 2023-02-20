(() => {
  const [t, o] = [1, 2];
  console.log(t, o);
  const n = (t) =>
    t && "undefined" != typeof window
      ? JSON.parse(localStorage.getItem(t))
      : null;
  function i(t) {
    return `${t}`;
  }
  var a, s;
  n("toDoList") ||
    ((a = "toDoList"),
    (s = [
      { id: 1, name: "Giau", task: "Work", date: "2023-03-04" },
      { id: 2, name: "Anh", task: "Work", date: "2023-03-05" },
    ]),
    localStorage.setItem(a, JSON.stringify(s))),
    (function (t) {
      let o = [];
      o.push(
        '<tr><td>STT<button onclick="sortTableByTD(0)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Tên<button onclick="sortTableByTD(1)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Công việc<button onclick="sortTableByTD(2)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Ngày làm<button onclick="sortTableByTD(3)" style="float:right" ><i class="fas fa-sort"></i></button></td><td>Sửa</td><td>Xóa</td></tr>'
      ),
        (o = o.concat(
          (function (t) {
            let o = [];
            console.log("string123", o), console.log(t);
            for (let n = 0; n < t.length; n++)
              o.push(
                '<tr><td id="index">' +
                  i(t[n].id) +
                  '</td><td id="nameintd">' +
                  i(t[n].name) +
                  '</td><td id="taskintd">' +
                  i(t[n].task) +
                  '</td><td id="dateintd">' +
                  i(t[n].date) +
                  `</td><td><button data-test='${i(
                    JSON.stringify(t[n])
                  )}' onclick="getInfCurTask(this)">Sửa</button></td><td><button onclick="delTask(` +
                  i(t[n].id) +
                  ')">Xóa</button></td></tr>'
              );
            return o;
          })(t)
        )),
        console.log(o);
      let n = document.getElementById("tb");
      (n.innerHTML = ""), (n.innerHTML = o.join(""));
    })(n("toDoList"));
})();
