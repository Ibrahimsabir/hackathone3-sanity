import { IoIosStar } from "react-icons/io";
import Image from "next/image";

interface Data {
  text: string;
  p: string;
  date?: string;
}

export default function Card(props: Data) {
  return (
    <div>
      <div className="w-[400px] rounded-[20px] border-[1px] border-[#0000001A]">
        <div className="m-8 pb-0">
          <div className="flex gap-2 text-lg text-[#FFC633] h-[22px]">
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </div>
          <div className="flex gap-1 justify-start items-center">
            <h3 className="w-[92px] h-[15px] text-[20px] leading-[22px] font-bold my-4">
              {props.text}
            </h3>
            <Image
              className="my-4"
              src={"/customerright.png"}
              alt={"icon"}
              height={24}
              width={24}
            />
          </div>
          <p className="text-[16px] text-[#00000099] text-justify mb-4">
            {props.p}
          </p>
          {props.date ? (
            <p className="text-gray-600 text-md font-normal mt-auto self-start">
              {`Posted on ${props.date}`}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}