const PresidentData = ({ data }) => {
  return (
    <div>
      <>
        <div className="my-4 flex justify-center">
          <picture className="w-52 h-52">
            {data?.image?.url ? (
              <img
                src={data?.image.url}
                className="object-cover w-52 h-52"
                alt="profile"
              />
            ) : (
              <img
                src={`/assets/profile.jpg`}
                className="object-cover"
                alt="profile"
              />
            )}
          </picture>
        </div>
        <div className="teachers-card-identity">
          <h4 className="font-medium text-lg">{data.name}</h4>
          <h5>{data?.position}</h5>

          {data?.phone && <h5>মোবাইল {data.phone}</h5>}
          <h5 className="mt-6 text-md font-semibold">অধ্যক্ষের বাণী</h5>

          {data?.desc && (
            <div
              className="no-tailwind"
              dangerouslySetInnerHTML={{
                __html: data?.desc || "",
              }}
            />
          )}
          <h5 className="mt-6">{data?.institution}</h5>
        </div>
      </>
    </div>
  );
};

export default PresidentData;
