import { TfiEmail } from "react-icons/tfi";

export default function NewsLetter(){
    return(
        <div className="lg:w-[1240px] lg:h-[180px] w-[358px] h-[293px]  sm:w-[708px] sm:h-[153px] rounded-[20px] bg-[#000000] relative lg:left-[80px] left-3 lg:top-[90px] sm:top-[40px]">
            <div className="md:flex">
            <h5 className="lg:w-[551px] lg:h-[92px] w-[297px] h-[105] font-bold lg:text-[40px] text-[32px] lg:leading-[45px] leading-[35px] text-[#FFFFFF] lg:pt-[40px] pt-[20px] lg:pl-[40px] pl-[24px]">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h5>
            <div className="lg:mt-[40px] mt-[30px] lg:ml-[160px] ml-[24px]">
            <div className="lg:w-[349px] lg:h-[48px] w-[311px] h-[42px] rounded-[62px] bg-[#FFFFFF] flex  text-[#00000066]">
            <TfiEmail className="ml-5 mt-4 text-lg" />
            <p className="py-[12px] px-[16px] leading-[21.6px] text-[16px]">Enter your email address</p>
            </div>
            <div className="lg:w-[349px] lg:h-[48px] w-[311px] h-[42px] rounded-[62px] bg-[#FFFFFF]  text-[#000000] mt-[15px]">
            <p className="py-[12px] px-[16px] leading-[21.6px] text-[16px] text-center">Subscribe to Newsletter</p>
            </div>
            </div>
            </div>
            </div>
    )
}