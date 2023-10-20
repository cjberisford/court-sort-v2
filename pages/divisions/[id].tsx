import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import Breadcrumbs from '../../components/Breadcrumbs';
import LoadingIndicator from '../../components/ui/loading-indicator';
import PageHeader from '../../components/ui/page-header';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const club = await prisma.division.findUnique({
    where: {
      id: Number(params?.id),
    },
  });
  return {
    props: club,
  };
};

// async function publishPost(id: string): Promise<void> {
//   await fetch(`/api/publish/${id}`, {
//     method: 'PUT',
//   });
//   await Router.push('/');
// }

// async function deletePost(id: string): Promise<void> {
//   await fetch(`/api/post/${id}`, {
//     method: 'DELETE',
//   });
//   Router.push('/');
// }

const Club: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  return (
    <Layout children={''} width={undefined}>
      <Breadcrumbs pageAlias={props.name}></Breadcrumbs>
      {status === 'loading' ?
        (
          <LoadingIndicator />)
        :
        (
          <>
            <PageHeader title={props.name} subtitle={""} />
          </>)
      }


    </Layout>
  );
};

export default Club;