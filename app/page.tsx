import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div><Link href={`/udp/`} className="text-sky-600 hover:underline">JSON and UDP</Link></div>
      <div><Link href={`/messagepack/`} className="text-sky-600 hover:underline">JSON and MessagePack</Link></div>
    </div>
  );
}
