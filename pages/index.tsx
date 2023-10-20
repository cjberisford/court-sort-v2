import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma';
import { ClubProps } from "../components/models/Club";
import Nav from "../components/Nav";

export const getStaticProps: GetStaticProps = async () => {
  const clubs = await prisma.club.findMany()
  return {
    props: { clubs },
    revalidate: 10,
  };
};

type Props = {
  clubs: ClubProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (

    <Layout width="full">
      <div className="w-full flex grow justify-center">
        <div className="grow bg-center bg-no-repeat bg-[url('../public/images/banner.jpg')] bg-secondary bg-blend-multiply">
          <div className="px-4 mx-auto max-w-screen-xl min-h-full text-center flex items-center">
            <div>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">League Badminton made simpler.</h1>
              <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">CourtSort is a consolidated platform for organising league badminton. Run sessions, view league fixtures and statistics; all your club's data in one place.  </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:primary-foreground focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                  Get started
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
                <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout >

  )
}

export default Blog
