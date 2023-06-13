import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTalents, setKeyword } from "../../redux/talents/action";
import Swal from "sweetalert2";
import { accessTalents } from "../../const/access";
import SBreadCrumb from "../../components/Breadcrumb";
import SButton from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import SAlert from "../../components/Alert";
import Table from "../../components/TableWithAction";
import { setNotif } from "../../redux/notif/action";
import { deleteData } from "../../utils/fetch";

export default function PageTalents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notif = useSelector((state) => state.notif);
  const talents = useSelector((state) => state.talents);
  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessTalents).forEach(function (key, index) {
      if (accessTalents[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch, talents.keyword]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/talents/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus speaker ${res.data.data.name}`
          )
        );

        dispatch(fetchTalents());
      }
    });
  };

  return (
    <Container className="mt-3">
      <SBreadCrumb textSecond={"Talents"} />
      {access.tambah && (
        <div className="mb-3">
          <SButton action={() => navigate("/talents/create")}>Tambah</SButton>
        </div>
      )}
      <SearchInput
        name="keyword"
        query={talents.keyword}
        handleChange={(e) => dispatch(setKeyword(e.target.value))}
      />
      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={talents.status}
        thead={["Nama", "Role", "Avatar", "Aksi"]}
        data={talents.data}
        tbody={["name", "role", "avatar"]}
        editUrl={access.edit ? `/talents/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}
