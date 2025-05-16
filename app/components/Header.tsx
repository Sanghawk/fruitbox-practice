"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const pathname = usePathname();
  const pathArr = pathname.split("/");
  const isTenzy = pathArr.length > 1 && pathArr[1] === "tenzy";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Header styles
  const headerStyles = {
    position: "sticky top-0 left-0 right-0 z-50",
    dimensions: "h-[64px]",
    border: "border-b-[1px] border-base-200 dark:border-base-900",
    bgAndText: "base-bg-and-text",
  };

  return (
    <header
      className={clsx(
        headerStyles.position,
        headerStyles.dimensions,
        headerStyles.border,
        headerStyles.bgAndText
      )}
    >
      <div className="relative mx-auto max-w-screen-lg h-full">
        <div className="flex items-center h-full mx-4">
          <div className="flex flex-row justify-between items-center gap-4 w-full">
            <Link className="btn btn-md font-bold text-mono text-xl" href="/">
              w(q)
            </Link>
            <div className="">
              {isTenzy && (
                <TenzyNav
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TenzyNav({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}) {
  return (
    <div className="flex flex-row gap-1.5">
      <Link
        className="btn btn-sm btn-primary font-bold text-mono"
        href="/tenzy"
      >
        Play Tenzy!
      </Link>
      <div className="w-px h-[20px] m-auto bg-base-800 dark:bg-base-900" />
      {/* Desktop menu */}
      <DesktopTenzyNav />
      {/* Mobile menu */}
      <MobileTenzyNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}

function DesktopTenzyNav() {
  return (
    <div className="hidden md:flex flex-row gap-1">
      <Link
        className="btn btn-sm btn-primary font-bold text-mono"
        href="/tenzy/howtoplay"
      >
        How to Play
      </Link>
      <Link
        className="btn btn-sm btn-primary font-bold text-mono"
        href="/tenzy/leaderboard"
      >
        Leaderboard
      </Link>
      <Link
        className="btn btn-sm btn-primary font-bold text-mono"
        href="/tenzy/changelog"
      >
        Changelog
      </Link>
    </div>
  );
}

function MobileTenzyNav({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}) {
  return (
    <div className="md:hidden relative">
      <button
        className="btn btn-sm btn-primary font-bold text-mono"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </button>
      {isMenuOpen && (
        <div className="base-bg-and-text absolute right-0 mt-2 w-48 rounded-md  ring-1 ring-base-200 dark:ring-base-900 ring-opacity-5">
          <div className="py-1" role="menu">
            <Link
              className="block px-4 py-2 text-md hover:bg-base-200 dark:hover:bg-base-900"
              href="/tenzy/howtoplay"
              onClick={() => setIsMenuOpen(false)}
            >
              How to Play
            </Link>
            <Link
              href="/tenzy/leaderboard"
              className="block px-4 py-2 text-md hover:bg-base-200 dark:hover:bg-base-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              href="/tenzy/changelog"
              className="block px-4 py-2 text-md hover:bg-base-200 dark:hover:bg-base-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Changelog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
