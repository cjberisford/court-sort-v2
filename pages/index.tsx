import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma';
import { ClubProps } from "../components/models/Club";
import Router from "next/router";
import Breadcrumbs from "../components/Breadcrumbs";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.club.findMany()
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: ClubProps[]
}

const Blog: React.FC<Props> = (props) => {

  console.log(props);
  return (
    <Layout>
      <Breadcrumbs />
      <div className="page">
        <main>
          <h1 className="mb-4 pt-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"> Barnsley Badminton League</h1>
          <h2 className="text-4xl font-extrabold">Division 1</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">

                  </th>
                  <th scope="col" className="px-6 py-3">

                  </th>
                  <th scope="col" className="px-6 py-3">
                    Played
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Won
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Drawn
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Lost
                  </th>
                  <th scope="col" className="px-6 py-3">
                    For
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Against
                  </th>
                  <th scope="col" className="px-6 py-3">
                    +/-
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.feed.map((club) => (

                  <tr onClick={() => Router.push("/club/[id]", `/club/${club.id}`)} className="bg-white border-b dark:bg-gray-800 hover:bg-gray-600 dark:border-gray-700">
                    <td scope="row" className="px-6 py-4">
                      1
                    </td>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {club.name}
                    </th>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>



        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
