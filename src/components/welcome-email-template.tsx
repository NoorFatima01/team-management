import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface EmailTemplateProps {
  userName: string;
}

export default function EmailTemplate({ userName }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='bg-gray-100'>
          <Container>
            <Section className='bg-white border-black my-10 px-10 py-4 rounded-md'>
              <Heading className='text-2xl font-bold leading-tight'>
                Welcome, {userName}!
              </Heading>
              <Text>
                We are excited to have you on board. You just registered
                yourself as a member on{' '}
                <span className='font-bold'>TeamManager</span>. You can now join
                an already created team or create your own team, invite your
                friends, chat with your friends, and start managing your
                projects.
              </Text>
              <Hr />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
