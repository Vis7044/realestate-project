import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ Listing }) => {
  console.log(Listing);
  return (
    <div className="w-full sm:w-[330px] bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
      <Link className="text-decoration-none" to={`/listing/${Listing._id}`}>
        <img
          src={Listing.imageUrls[0]} 
          alt="Listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {Listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="truncate text-sm test-grey-600 w-full">
              {Listing.address}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {Listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            ${" "}
            {Listing.offer
              ? Listing.discountedPrice.toLocaleString("en-US")
              : Listing.regularPrice.toLocaleString("en-US")}
            {Listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">{Listing.bedrooms>1?`${Listing.bedrooms} beds`:`${Listing.bedrooms} bed`}</div>
            <div className="font-bold text-xs">{Listing.bathrooms>1?`${Listing.bedrooms} baths`:`${Listing.bathrooms} bath`}</div>
            
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
