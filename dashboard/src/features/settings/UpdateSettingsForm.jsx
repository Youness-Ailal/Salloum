import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
import idv4 from "uuid4";

import "../../styles/layoutPage.css";

import { BiImage, BiPlusCircle, BiTrash } from "react-icons/bi";
import Button from "../../ui/Button";
import { useState } from "react";
import { useLayout } from "./useLayout";
import { useEffect } from "react";
import { useUpdateLayout } from "./useUpdateLayout";

function UpdateSettingsForm() {
  const { isLoading, layout } = useLayout();
  const { isUpdating, update } = useUpdateLayout();
  const [localPartnersImages, setLocalPartnersImages] = useState([]);
  const [apiPartnersImages, setApiPartnersImages] = useState([]);
  const [banner, setBanner] = useState("");
  const [bannerHome, setBannerHome] = useState("");

  /*  */
  const newBannerFile = banner?.isNew ? banner.file : null;
  const newBannerHomeFile = bannerHome?.isNew ? bannerHome.file : null;
  const partnersToDelete = apiPartnersImages
    .filter(item => item?.delete)
    ?.map(item => ({ id: item.id, image: item.image }));
  const partnersToAdd = localPartnersImages
    .filter(item => !item?.delete)
    .map(item => item.file);
  /*  */

  const btnDisabled =
    isLoading ||
    isUpdating ||
    (!newBannerFile &&
      !partnersToAdd.length &&
      !partnersToDelete.length &&
      !newBannerHomeFile);
  useEffect(() => {
    if (!isLoading) {
      setLocalPartnersImages([]);
      const banner = layout?.filter(item => item.type === "banner")[0];
      setBanner(banner);
      const partners = layout?.filter(item => item.type === "partner");
      setApiPartnersImages(partners);
    }
  }, [layout, isLoading]);

  function changeBanner(file) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setBanner({ file, image: fileReader.result.toString(), isNew: true });
    };

    fileReader.readAsDataURL(file);
  }
  function changeBannerHome(file) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setBannerHome({ file, image: fileReader.result.toString(), isNew: true });
    };

    fileReader.readAsDataURL(file);
  }

  function deleteLocalPartner(id) {
    setLocalPartnersImages(prev => [
      ...prev.map(item => {
        if (item.id === id) return { ...item, delete: true };
        return item;
      }),
    ]);
  }
  function deleteApiPartner(id) {
    setApiPartnersImages(prev => [
      ...prev.map(item => {
        if (item.id === id) return { ...item, delete: true };
        return item;
      }),
    ]);
  }

  function addNewFile(file) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setLocalPartnersImages(prev => [
        ...prev,
        { file, image: fileReader.result.toString(), id: idv4() },
      ]);
    };

    fileReader.readAsDataURL(file);
  }

  if (isLoading) return <Spinner />;

  function handleUpdate() {
    update({
      newBannerFile,
      partnersToDelete,
      newBannerHomeFile,
      partnersImagesFiles: partnersToAdd,
    });
  }

  return (
    <>
      <div
        style={{
          marginBottom: "3rem",
          display: "flex",
          justifyContent: "end",
        }}>
        <Button
          onClick={handleUpdate}
          disabled={btnDisabled}
          isLoading={isUpdating}>
          Update Settings
        </Button>
      </div>
      <Form>
        <div>
          <p className="label-text">Home Page Image</p>
          <div className="banner-label">
            <label htmlFor="banner_home">
              <input
                onChange={e => changeBannerHome(e.target.files[0])}
                style={{ display: "none" }}
                type="file"
                id="banner_home"
              />
              <img src={bannerHome?.image} alt="" />
              <div className="backdrop">
                <BiImage />
              </div>
            </label>
          </div>
        </div>
        <div style={{ marginTop: "4rem" }}>
          <p className="label-text">Banner Layout</p>
          <div className="banner-label">
            <label htmlFor="banner">
              <input
                onChange={e => changeBanner(e.target.files[0])}
                style={{ display: "none" }}
                type="file"
                id="banner"
              />
              <img src={banner?.image} alt="" />
              <div className="backdrop">
                <BiImage />
              </div>
            </label>
          </div>
        </div>

        <div style={{ marginTop: "4rem" }}>
          <p className="label-text last">Partners Images</p>
          <div className="partners">
            {apiPartnersImages
              ?.filter(img => !img?.delete)
              .map(item => (
                <div
                  key={item.id}
                  onClick={() => deleteApiPartner(item.id)}
                  className="partner-con">
                  <img alt="" className="partner" src={item.image} />
                  <p>
                    <BiTrash />
                  </p>
                </div>
              ))}
            {localPartnersImages
              ?.filter(img => !img?.delete)
              .map(item => {
                return (
                  <div
                    key={item.id}
                    onClick={() => deleteLocalPartner(item.id)}
                    className="partner-con">
                    <img alt="" className="partner" src={item.image} />
                    <p>
                      <BiTrash />
                    </p>
                  </div>
                );
              })}
            <label htmlFor="new-partner" className="partner-plus">
              <input
                onChange={e => addNewFile(e.target.files[0])}
                id="new-partner"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
              />
              <BiPlusCircle />
            </label>
          </div>
        </div>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
