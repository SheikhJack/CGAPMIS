import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Next.js Profile | CGAPMIS",
  description: "This is CGAPMIS",
};

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Danish Heilium",
    position: "Ui/Ux Designer",
    age: 30,
    contactNumber: "+123 456 7890",
    email: "danish@example.com",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut.",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      about: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profileData);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <Image
              src={"/images/cover/cover-01.png"}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              width={970}
              height={260}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                />
                <span>Edit</span>
              </label>
            </div>
          </div>

          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <Image
                  src={"/images/user/user-06.png"}
                  width={160}
                  height={160}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                  alt="profile"
                />
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                Name:
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mb-2 p-2 border rounded"
                />
              </h3>
              <p className="font-medium">
                Position
                <input
                  type="text"
                  name="position"
                  value={profileData.position}
                  onChange={handleInputChange}
                  className="mb-2 p-2 border rounded"
                />
              </p>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Age: 
                <input
                  type="number"
                  name="age"
                  value={profileData.age}
                  onChange={handleInputChange}
                  className="mb-2 p-2 border rounded"
                />
              </p>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Contact: 
                <input
                  type="text"
                  name="contactNumber"
                  value={profileData.contactNumber}
                  onChange={handleInputChange}
                  className="mb-2 p-2 border rounded"
                />
              </p>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Email: 
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="mb-2 p-2 border rounded"
                />
              </p>

              <div className="mx-auto max-w-180 mt-4">
                <h4 className="font-semibold text-black dark:text-white">
                  About Me
                </h4>
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleAboutChange}
                  className="mt-4.5 w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-80"
          >
            Update Profile
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
