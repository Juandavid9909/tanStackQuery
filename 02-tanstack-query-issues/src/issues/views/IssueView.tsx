import { FiSkipBack } from 'react-icons/fi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { IssueComment } from '../components/IssueComment';
import { LoadingSpinner } from '../../shared';
import { useIssue } from '../hooks';

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const issueNumber = Number(params.issueNumber ?? 0);
  const { commentsQuery, issueQuery } = useIssue(issueNumber);

  if(issueQuery.isLoading) {
    return (
      <div>Cargando issue</div>
    );
  }

  if(!issueQuery.data) {
    return (
      <Navigate to='/404' />
    );
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          className="hover:underline text-blue-400 flex items-center"
          onClick={() => navigate(-1)}
        >
          <FiSkipBack />

          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={ issueQuery.data } />

      {/* Comentario de otros */}
      {
        commentsQuery.isLoading
          ? <LoadingSpinner />
          : (
            commentsQuery.data?.map((comment) => (
              <IssueComment issue={ comment } key={ comment.id } />
            ))
          )
      }
    </div>
  );
};
