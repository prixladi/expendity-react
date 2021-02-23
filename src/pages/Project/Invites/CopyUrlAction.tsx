import React, { useEffect } from 'react';
import { Tag, TagLabel, TagRightIcon, useClipboard } from '@chakra-ui/react';
import { FaClipboard } from 'react-icons/fa';
import { urlSuccessfulyCoppiedNotification } from '../../../services/notificationService';

type Props = {
  inviteUrl: string;
};

const CopyUrlAction: React.FC<Props> = ({ inviteUrl }: Props) => {
  const { hasCopied, onCopy } = useClipboard(inviteUrl);

  useEffect(() => {
    if (hasCopied) {
      urlSuccessfulyCoppiedNotification();
    }
  }, [hasCopied]);

  return (
    <Tag onClick={onCopy} cursor="pointer" colorScheme="brand">
      <TagLabel>Copy URL</TagLabel>
      <TagRightIcon as={FaClipboard} />
    </Tag>
  );
};

export default CopyUrlAction;
